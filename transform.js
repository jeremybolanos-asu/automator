// run this to install cheerio and clipboardy: npm install cheerio clipboardy
// run the script after copying code to edit: pbpaste | node ~/Documents/_Automation/transform.js | pbcopy
// paste the result back to the editor and it should be clean of the ck-editor attributes

const cheerio = require('cheerio');

let input = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', chunk => {
  input += chunk;
});

process.stdin.on('end', () => {
  const $ = cheerio.load(input, { decodeEntities: false }, false);

  $('td').each((i, el) => {
    const $td = $(el);

    const classAttr = $td.attr('class');
    if (classAttr && classAttr.includes('ck-editor__editable')) {
      $td.removeAttr('class');
      $td.removeAttr('contenteditable');
      $td.removeAttr('role');
    }
  });

  process.stdout.write($.root().html());
});
