
console.log("Copying latest build files required for demo and release...");

let target_path = "./build_copy";
var fs = require('fs');
if (!fs.existsSync(target_path)){
  fs.mkdirSync(target_path);
}

if (fs.existsSync(target_path)) {
  let chunk_files = [];
  let main_css_file;
  fs.readdirSync(target_path).forEach(file => {
    if (file.includes('main.') || file.includes('chunk.') || file.includes('bootstrap') || file.includes('.png')) {
      fs.unlinkSync(target_path+'/'+file);
      console.log("Deleted "+file);
    }
  })
  fs.readdirSync("build/static/js").forEach(file => {
    if (file.includes('.js') && !file.includes('.js.map')) {
      fs.copyFileSync("build/static/js/"+file, target_path+'/'+file);
      console.log("Copied "+file+" to "+target_path);
      if (file.includes('main.')) {
        main_js_file = file;
      }
      if (file.includes('chunk.js')) {
        chunk_files.push(file);
      }
    }
  })
  fs.readdirSync("build").forEach(file => {
    if (file.includes('.css') || file.includes('.png') || file.includes('bootstrap')) {
      fs.copyFileSync("build/"+file, target_path+'/'+file);
      console.log("Copied "+file+" to "+target_path);
    }
  })
  fs.readdirSync("build/static/css").forEach(file => {
    if (file.includes('.css') && !file.includes('.css.map')) {
      fs.copyFileSync("build/static/css/"+file, target_path+'/'+file);
      console.log("Copied "+file+" to "+target_path);
      main_css_file = file;
    }
  })
  let index_source = String(fs.readFileSync('./index_template.html'));
  index_source = index_source.replace('{{main_css_file}}', main_css_file);
  index_source = index_source.replace('{{main_js_file}}', main_js_file);
  let chunk_imports = '';
  for (i = 0;i < chunk_files.length;) {
    chunk_imports += '<script src="/'+ chunk_files[i] + '"></script>\n\t\t';
    i++;
  }
  index_source = index_source.replace('<!-- chunk files here -->', chunk_imports);
  fs.writeFileSync(target_path+'/index.html', index_source);
  console.log("Rendered new index.html");
}
