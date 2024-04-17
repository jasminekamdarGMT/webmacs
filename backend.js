const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}));

let session = require('express-session')
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'ancient ardvarks drink compost tea',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))

let fs = require('fs');
require('jsmart');

let facilities_dir = 'facilities/';
let facility_name_dir = (process.env.FACILITY || 'single_direction/vision_recycling');
if (process.argv.length > 2) {
  facility_name_dir = process.argv[2];
}
console.log("Starting mock backend server for "+facilities_dir+facility_name_dir+"...");
let custom_web_pages_dir = facilities_dir+facility_name_dir+ '/custom_web_pages';

let state = require(__dirname + '/' + facilities_dir+facility_name_dir + '/mocks/state.json');
let zone_startup = require(__dirname + '/' + facilities_dir+facility_name_dir + '/mocks/zone_startup.json');
let settings = require(__dirname + '/' + facilities_dir+facility_name_dir + '/mocks/settings.json');
let batch_files = require(__dirname + '/' + facilities_dir+facility_name_dir + '/mocks/batch_files.json');
batch_files.sort(function(a,b){return Number(b['id']) - Number(a['id'])});
let logged_in = false;

let user = {
  hasAccess: function (code) { return logged_in },
  load: function () { return '' },
  name: function () { return '' },
  email: function () { return '' }
}
let last_query = "";
function getRows() {
  if (last_query.includes("batch_files")) {
    return batch_files;
  } else if (last_query.includes("FacilityName")) {
    return [{value: "REVOLUTION ORGANICS COMPOST"}];
  } else {
    return settings;
  }
}
let sqlite = {
  setAccess: function (code) { return '' },
  open: function (file) { return '' },
  exec: function (query) {
    last_query = query;
    this.rows = getRows();
    this.rowsCount = this.rows.length;
    return ''
  },
  close: function () { return '' },
  rowsCount: 0,
  rows: []
}
let io = {
  load: function () { return '' },
  units: function (tag) {
    if (tag.match(/pressure/i)) { return 'WC' }
    if (tag.match(/speed/i)) { return '%' }
    if (tag.match(/damper/i)) { return '%' }
    for (let i = 0; i < settings.length; i++) {
      if (settings[i].name == 'TemperatureUnit') {
        return settings[i].value;
      }
    }
    return 'C'
  }
}
let reg = {
  load: function () { return '' }
}
let evnt = {
  load: function () { return '' }
}


function renderTemplate(req, res, template_name) {
  if (process.env.PORT) {
    logged_in = req.session.authenticated;
  } else {
    logged_in = true;
  }
  let template_path = './'+custom_web_pages_dir+'/'+template_name;
  if (!fs.existsSync(template_path)){
    template_path = './build_copy/'+template_name;
  }
  let tpl = fs.readFileSync(template_path, {encoding: 'utf-8'});
  let compiledTpl = new jSmart(tpl);
  let template_data = {
    user: user,
    sqlite: sqlite,
    io: io,
    reg: reg,
    evnt: evnt
  }
  res.send(compiledTpl.fetch(template_data));
}

app.get('/', function (req, res) {
  res.send("Redirecting...<script>window.location.href = '/index.html';</script>")
})

app.get('/index.html', function (req, res) {
  renderTemplate(req, res, 'index.html');
})

app.get('/status.html', function (req, res) {
  renderTemplate(req, res, 'status.html');
})

app.get('/settings.html', function (req, res) {
  renderTemplate(req, res, 'settings.html');
})

app.get('/logs.html', function (req, res) {
  renderTemplate(req, res, 'logs.html');
})

app.get('/inputs.html', function (req, res) {
  renderTemplate(req, res, 'inputs.html');
})

app.get('/loginScreen.html', function (req, res) {
  if (req.session.authenticated == true) {
    res.send("Success!<script>window.location.href = '/index.html';</script>")
  } else {
    res.send("<form method='POST'>Username: <input name='username'><br>Password: <input name='password'><input type='submit' value='Log In'></form>")
  }
})

app.post('/loginScreen.html', function(req, res) {
  if (req.body.username == "gmt" && req.body.password == "webdemo") {
    req.session.authenticated = true
    res.send("Success!<script>window.location.href = '/index.html';</script>")
  } else {
    res.send("<form method='POST'>Username: <input name='username'><br>Password: <input name='password'><input type='submit' value='Log In'></form>")
  }
});

app.get('/graph.html', function (req, res) {
  res.sendFile(__dirname+'/'+custom_web_pages_dir+'/graph.html')
})

app.get('/state.json', function (req, res) {
  res.send(state)
})

app.get('/secureState.xml', function (req, res) {
  for(let key in req.query) {
    if (key.includes('State')) {
      state_key = key.replace('State','')
      state[state_key] = req.query[key]
      if (state_key.includes('blower') && state_key.includes('value')) {
        // simulate applying blower override value to speed
        if (state[state_key.replace('value', 'override')] == 1) {
          state[state_key.replace('value', 'speed')] = req.query[key];
        }
      }
      console.log(state_key+" set to "+state[state_key])
    }
  }
  res.send("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><datavalues></datavalues>")
})

app.post('/sqliteOps.php', function (req, res) {
  if (req.body.query.includes("UPDATE")) {
    let sections = req.body.query.split("'")
    if (sections[0] == 'UPDATE settings SET `value`=') {
      let value = sections[1]
      let name = sections[3]
      let success = false
      for (let i = 0; i < settings.length; i++) {
        if (settings[i].name == name) {
          settings[i].value = value
          success = true
          console.log(name+" set to "+value)
        }
      }
      if (success == false) {
        console.log("Failed to set "+name+" to "+value)
      }
    } else if (sections[0] === 'UPDATE zone_startup SET `state`=') {
      if (sections[3].slice(-5) === 'batch') {
        let zone_id = sections[3].slice(-7,-5);
        let today = new Date();
        let month = today.getMonth()+1;
        month = month < 10 ? '0'+month : month;
        let time = new Date().getTime();
        let file_date = month+'_'+today.getDate()+'_'+today.getFullYear()+'_'+time+'_';
        let batch_name = sections[1];
        let filename = '/usb/'+file_date+batch_name+'.csv';
        if (batch_name !== '') {
          batch_files.unshift({ id: batch_files.length+1, name: filename, title: batch_name });
          zone_startup.forEach((data) => {
            if (data.name === 'zone'+zone_id+'filename') {
              data.state = filename;
            }
          });
        }
      }
    }
    res.send("SUCESS")
  } else if (req.body.query.includes("DELETE")) {
    let sections = req.body.query.split("'")
    if (sections[0] == 'DELETE FROM batch_files WHERE name=') {
      let fileToDelete = sections[1];
      batch_files = batch_files.filter((file) => {
        return file.name !== fileToDelete;
      });
    }
    res.send("SUCESS")
  } else if (req.body.query == "SELECT * FROM zone_startup;") {
    res.send(JSON.stringify(zone_startup))
  } else if (req.body.query == "SELECT name, value FROM settings;") {
    res.send(JSON.stringify(settings))
  } else if (req.body.query == "SELECT * FROM batch_files ORDER BY id DESC;") {
    res.send(JSON.stringify(batch_files))
  } else {
    res.sendFile(__dirname + '/cowlitz_valley/mocks/sqliteOps.php')
  }
})

app.post('/fileOps.php', function (req, res) {
  res.sendFile(__dirname + '/'+facilities_dir+facility_name_dir+'/mocks/zone.csv')
})

app.get('/deleteFile.php', function (req, res) {
  if (req.query.filename === '/usb/batch_files.db') {
    batch_files = [];
  }
  res.send("SUCESS");
})

app.use('/css/', express.static('x600m/css'))
app.use('/javascript/', express.static('x600m/javascript'))
app.use('/', express.static(custom_web_pages_dir))
app.use('/', express.static('build_copy'))
app.use('/', express.static('public'))

let port = (process.env.PORT || '3000')
app.listen(port, function () {
  console.log('Mock backend server listening on port '+port+'!')
})
