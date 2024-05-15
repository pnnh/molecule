import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: '创业了几年最后没赚到钱，那么为什么还创业？去gap两年旅行完全没有收入，为啥还有人gap？' },
      { id: 13, name: '向的经验告诉我们，贪心最优解往往会落入本地最大值，却会错过全局最大值，最可怕的是，由于人生变数太多，导致维度太大，你就算顺着梯度摸过去，也很可能摸得不是本地最大值，说不定就围着最大值转来转去。何况，人生哪有那么多次调整参数的机会，就按平均四年一个调整周期来看，也不过是十几二十次的' },
      { id: 14, name: '你被顺水推舟习惯了，就觉得读高中->读大学->读个研究生->进个公司或者事业单位->升职->退休 这就是正常而成功。' },
      { id: 15, name: '创业了几年最后没赚到钱，那么为什么还创业？去gap两年旅行完全没有收入，为啥还有人gap？' },
      { id: 16, name: '我是不赞同说读博可能起薪没比只读硕士好但是未来发展会更好这种说法。不论如何这也就是你拿来填充这50年的一个方法罢了。' },
      { id: 17, name: '创业了几年最后没赚到钱，那么为什么还创业？去gap两年旅行完全没有收入，为啥还有人gap？' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes};
  }
}
