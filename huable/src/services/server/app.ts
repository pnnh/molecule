export function selectApps() {
    const env = process.env.NODE_ENV
    return [
        {
        id: 1,
        name: '北极星笔记',
        description: '对于很多效率工具用户而言，笔记软件、写作软件、日历应用、待办工具成为效率工具折腾四件套。其中，笔记软件赛道已经出现多种有特色的应用，细化为多种类别。对此，如何找到合适的笔记软件对你的学习和工作效率至关重要。',
        url: `https://polaris.huable.${env === 'production' ? 'xyz' : 'dev'}`
        },
        {
        id: 2,
        name: '密码生成器',
        description: '密码是一种用来混淆的技术，它希望将正常的信息转变为无法识别的信息。当然，对一小部分人来说，这种无法识别的信息是可以再加工并恢复的。密码在中文里是口令的通称。',
        url: `https://sirius.huable.${env === 'production' ? 'xyz' : 'dev'}`
        }
    ]
}
        