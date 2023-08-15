/**
 * @author lorre0322
 * @description a simple note create by lorre.
 */
hexo.extend.tag.register('note', function(args, content) {
  var cls = args[0] || 'note';
  var title = args.slice(1).join(' ') || 'Note';
  var lines = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  });
  var content =`
  <div class="nt ${cls}">
  <div class="nt-ti">${title}</div>
  <div class="nt-bd">${lines}</div>
  </div>
  `
  return content;
}, {
  async: true,
  ends: true
});