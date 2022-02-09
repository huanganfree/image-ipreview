/**
 * 在使用chalk库更改git shell输出文字颜色之前，需要执行：FORCE_COLOR=1
 * 
 */

const chalk = require('chalk')

const msgPath = process.env.HUSKY_GIT_PARAMS // msgPath => .git/COMMIT_EDITMSG（文件存的是提交的msg）
const msg = require('fs')
.readFileSync(msgPath, 'utf-8')
.trim()

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,80}/

if (!commitRE.test(msg)) {
    console.log()
    console.log(
    `  ${chalk.bgRed.white(' ERROR: ')} ${chalk.red(
        '不合法的 commit 消息格式',
    )}\n\n`
        + chalk.red(
            '  请使用正确的提交格式:\n\n',
        )
        + `    ${chalk.green('feat: add \'comments\' option')}\n`
        + `    ${chalk.green('fix: handle events on blur (close #28)')}\n\n`
        + chalk.yellowBright('  请查看 git commit 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md。\n'),
    )

    process.exit(1)
}