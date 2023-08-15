/**
 * @author Lete114
 * @description Generate code boxes for code blocks and copy buttons
 */

const reg = /(<figure class="highlight (.*?)">)(.*?)(<\/figure>)/g
hexo.extend.filter.register('after_render:html', function (data, local) {
  return data.replace(reg, function (match, $1, $2, $3, $4) {
    const figure_after = $1
    const lang = $2
    const table = $3
    const figure_before = $4
    const code_block_header = `
    <div class="cp-wrap" lang="${lang}">
      <div class="cp-head">
      <span class="cp-lang">${lang}</span>
      <span class="cp-code">COPY</span>
      </div>
    </div>
    `
    return `${figure_after}${code_block_header}${table}${figure_before}`
  })
})
