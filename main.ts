function updatePointing (val: number) {
    pointing += val
    if (pointing < 0) {
        pointing = arrowList.length - 1
    } else {
        if (pointing >= arrowList.length) {
            pointing = 0
        }
    }
    arrow.setImage(arrowList[pointing])
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    run()
    arrow.startEffect(effects.fire)
})
function run () {
    arrow.vy = ySpeed[pointing]
    arrow.vx = xSpeed[pointing]
    arrow.ax += xSpeed[pointing] * 1.5
    arrow.ay += ySpeed[pointing] * 1.5
}
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    run()
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    timer.throttle("action", 100, function () {
        updatePointing(1)
    })
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    updatePointing(-1)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    updatePointing(1)
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    effects.clearParticles(arrow)
    arrow.ay = 0
    arrow.ax = 0
    for (let index = 0; index < 3; index++) {
        pause(100)
        arrow.vy = arrow.vy / 2
        arrow.vx = arrow.vx / 2
    }
    arrow.vy = 0
    arrow.vx = 0
})
function ship () {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(mySprite)
    character.loopFrames(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . d d . . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . 9 d 2 2 d 9 . . . . . 
        e . . d d 1 d e e d 1 d d . . e 
        e b 9 d 1 1 b c c b 1 1 d 9 b e 
        e d 1 1 1 1 b e e b 1 1 1 1 d e 
        e d 1 d d 1 b e e b 1 d d 1 d e 
        e b d 5 5 d b e e b d 5 5 d b e 
        . . . . . . d e e d . . . . . . 
        . . . . . . 1 e e 1 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . d d . . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . 9 d 2 2 d 9 . . . . . 
        e . . d d 1 d e e d 1 d d . . e 
        e b 9 d 1 1 b c c b 1 1 d 9 b e 
        e d 1 1 1 1 b e e b 1 1 1 1 d e 
        e d 1 d d 1 b e e b 1 d d 1 d e 
        e b d 5 5 d b e e b d 5 5 d b e 
        . . . . . . d e e d . . . . . . 
        . . . . . . 1 e e 1 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . d d . . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . 9 d 2 2 d 9 . . . . . 
        e . . d d 1 d e e d 1 d d . . e 
        e b 9 d 1 1 b c c b 1 1 d 9 b e 
        e d 1 1 1 1 b e e b 1 1 1 1 d e 
        e d 1 d d 1 b e e b 1 d d 1 d e 
        e b d 5 5 d b e e b d 5 5 d b e 
        . . . . . . d e e d . . . . . . 
        . . . . . . 1 e e 1 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . d d . . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . . d e e d . . . . . . 
        . . . . . 9 d 2 2 d 9 . . . . . 
        e . . d d 1 d e e d 1 d d . . e 
        e b 9 d 1 1 b c c b 1 1 d 9 b e 
        e d 1 1 1 1 b e e b 1 1 1 1 d e 
        e d 1 d d 1 b e e b 1 d d 1 d e 
        e b d 5 5 d b e e b d 5 5 d b e 
        . . . . . . d e e d . . . . . . 
        . . . . . . 1 e e 1 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    200,
    character.rule(Predicate.NotMoving)
    )
    character.loopFrames(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . b c . . . . . 
        . . . . . . . . . d d . . . . . 
        . . . . . . . . c e e . . . . . 
        . . . . . . . . c e e c . . . . 
        . . . . . . . . b e e c . . . . 
        . . . . . . . c b e e b . . . . 
        . . e c . . b 1 d e e d d c . e 
        . . e b b d 1 1 d c c d 1 d b e 
        . . e b d 1 1 1 d e e d 1 1 1 e 
        . . e b d d d 1 d e e d d d d e 
        . . c c b 4 4 d d e e d 4 e c . 
        . . . . . . . c b e e b . . . . 
        . . . . . . . . c e e . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    character.rule(Predicate.MovingRight)
    )
    character.loopFrames(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . c b . . . . . . . . . 
        . . . . . d d . . . . . . . . . 
        . . . . . e e c . . . . . . . . 
        . . . . c e e c . . . . . . . . 
        . . . . c e e b . . . . . . . . 
        . . . . b e e b c . . . . . . . 
        e . c d d e e d 1 b . . c e . . 
        e b d 1 d c c d 1 1 d b b e . . 
        e 1 1 1 d e e d 1 1 1 d b e . . 
        e d d d d e e d 1 d d d b e . . 
        . c e 4 d e e d d 4 4 b c c . . 
        . . . . b e e b c . . . . . . . 
        . . . . . e e c . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    character.rule(Predicate.MovingLeft)
    )
}
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    timer.throttle("action", 100, function () {
        updatePointing(-1)
    })
})
let mySprite: Sprite = null
let pointing = 0
let xSpeed: number[] = []
let ySpeed: number[] = []
let arrowList: Image[] = []
let arrow: Sprite = null
effects.starField.startScreenEffect()
arrow = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
arrow.setPosition(80, 110)
arrow.setBounceOnWall(true)
arrow.setStayInScreen(true)
arrowList = [
img`
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . 1 f b 1 . . . . . . 
    . . . . . 1 f f f b 1 . . . . . 
    . . . . 1 f f f f f b 1 . . . . 
    . . . 1 f f f f f f f b 1 . . . 
    . . 1 f f f f f f f f f b 1 . . 
    . 1 f f f f f f f f f f f b 1 . 
    1 f f f f f f f f f f f f f b 1 
    1 f f f f f f f f f f f f f b 1 
    1 f f f f f f f f f f f f f b 1 
    . 1 1 1 1 1 1 f b 1 1 1 1 1 1 . 
    . . . . . . 1 f b 1 . . . . . . 
    . . . . . . 1 f b 1 . . . . . . 
    . . . . . . 1 b b 1 . . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . 1 1 1 1 1 1 1 1 1 1 1 1 
    . . . . 1 f f f f f f f f f b 1 
    . . . . . 1 f f f f f f f f b 1 
    . . . . . . 1 f f f f f f f b 1 
    . . . . . . . 1 f f f f f f b 1 
    . . . . . . . . 1 f f f f f b 1 
    . . . . . . . 1 f f f f f f b 1 
    . . . . . . 1 f f b b f f f b 1 
    . . . . . 1 f f b 1 1 f f f b 1 
    . . . . 1 f f b 1 . . 1 f f b 1 
    . . . . 1 f b 1 . . . . 1 f b 1 
    . . . . . 1 1 . . . . . . 1 b 1 
    . . . . . . . . . . . . . . 1 1 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . 1 b b b 1 . . . . . . 
    . . . . . 1 f f f b 1 . . . . . 
    . . . . . 1 f f f f b 1 . . . . 
    . . . . . 1 f f f f f b 1 . . . 
    . . . . . 1 f f f f f f b 1 . . 
    . 1 1 1 1 1 f f f f f f f b 1 . 
    . 1 f f f f f f f f f f f f b 1 
    . 1 f f f f f f f f f f f f b 1 
    . 1 1 1 1 1 f f f f f f f b 1 . 
    . . . . . 1 f f f f f f b 1 . . 
    . . . . . 1 f f f f f b 1 . . . 
    . . . . . 1 f f f f b 1 . . . . 
    . . . . . 1 f f f b 1 . . . . . 
    . . . . . 1 b b b 1 . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 1 1 . . . . . . . 1 1 
    . . . . 1 f b 1 . . . . . 1 b 1 
    . . . . 1 f f b 1 . . . 1 f b 1 
    . . . . . 1 f f b 1 . 1 f f b 1 
    . . . . . . 1 f f b 1 f f f b 1 
    . . . . . . . 1 f f b f f f b 1 
    . . . . . . . 1 f f f f f f b 1 
    . . . . . . 1 f f f f f f f b 1 
    . . . . . 1 f f f f f f f f b 1 
    . . . . 1 f f f f f f f f f b 1 
    . . . 1 f f f f f f f f f f b 1 
    . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . . 1 b b 1 . . . . . . 
    . . . . . . 1 f b 1 . . . . . . 
    . . . . . . 1 f b 1 . . . . . . 
    . 1 1 1 1 1 1 f b 1 1 1 1 1 1 . 
    1 f f f f f f f f f f f f f b 1 
    1 f f f f f f f f f f f f f b 1 
    1 f f f f f f f f f f f f f b 1 
    . 1 f f f f f f f f f f f b 1 . 
    . . 1 f f f f f f f f f b 1 . . 
    . . . 1 f f f f f f f b 1 . . . 
    . . . . 1 f f f f f b 1 . . . . 
    . . . . . 1 f f f b 1 . . . . . 
    . . . . . . 1 f b 1 . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    1 1 . . . . . . . . . . . . . . 
    1 f 1 . . . . . . 1 1 . . . . . 
    1 f f 1 . . . . 1 f b 1 . . . . 
    1 f f f 1 . . 1 f f b 1 . . . . 
    1 f f f f 1 1 f f b 1 . . . . . 
    1 f f f f f f f b 1 . . . . . . 
    1 f f f f f f b 1 . . . . . . . 
    1 f f f f f b 1 . . . . . . . . 
    1 f f f f f f b 1 . . . . . . . 
    1 f f f f f f f b 1 . . . . . . 
    1 f f f f f f f f b 1 . . . . . 
    1 f f f f f f f f f b 1 . . . . 
    1 1 1 1 1 1 1 1 1 1 1 1 . . . . 
    `,
img`
    . . . . . . . 1 1 1 . . . . . . 
    . . . . . . 1 f f b 1 . . . . . 
    . . . . . 1 f f f b 1 . . . . . 
    . . . . 1 f f f f b 1 . . . . . 
    . . . 1 f f f f f b 1 . . . . . 
    . . 1 f f f f f f b 1 . . . . . 
    . 1 f f f f f f f b 1 1 1 1 1 . 
    1 f f f f f f f f f f f f b 1 . 
    1 f f f f f f f f f f f f b 1 . 
    . 1 f f f f f f f b 1 1 1 1 1 . 
    . . 1 f f f f f f b 1 . . . . . 
    . . . 1 f f f f f b 1 . . . . . 
    . . . . 1 f f f f b 1 . . . . . 
    . . . . . 1 f f f b 1 . . . . . 
    . . . . . . 1 f f b 1 . . . . . 
    . . . . . . . 1 1 1 . . . . . . 
    `,
img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
    1 f f f f f f f f f f b 1 . . . 
    1 f f f f f f f f f b 1 . . . . 
    1 f f f f f f f f b 1 . . . . . 
    1 f f f f f f f b 1 . . . . . . 
    1 f f f f f f b 1 . . . . . . . 
    1 f f f f f f b 1 . . . . . . . 
    1 f f f f 1 f f b 1 . . . . . . 
    1 f f f 1 . 1 f f b 1 . . . . . 
    1 f f 1 . . . 1 f f b 1 . . . . 
    1 f 1 . . . . . 1 f b 1 . . . . 
    1 1 . . . . . . . 1 1 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
]
ySpeed = [
-50,
-50,
0,
50,
50,
50,
0,
-50
]
xSpeed = [
0,
50,
50,
50,
0,
-50,
-50,
-50
]
pointing = 0
updatePointing(0)
