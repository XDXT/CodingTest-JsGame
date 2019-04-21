//*.贴墙0速移动

debug {
  //1.s S => 只up了一个，遗留了另一个。
}


*.地面场景载入 by bgMap[]  ----- [a, xnum, ynum] todp ynum
  场景切换 => 关卡切换

*.人物属性，攻击动作
  人物载入 -- walk/stand 有动画
  人物动作切换 - walk/run {attack/tap weapon}
  1.player加 action属性(stand, walk, run ...)
  2.s => walkright  shift + s => runright

*.场景建筑&物品
  场景物品载入 - tree/house/...

*.配乐

*.敌人 + AI
  敌人AI - attack/move direction select
  人物属性&攻击判定  - life/attack/weapons...

*.场景切换

*.道具/武器系统

*.开始&结束场景

*.碰撞问题

*.关卡设计(<=3关)


*.地图编辑器

*.自适应

**.upload to server
