function updatePointing (val: number) {
    pointing += val
    if (pointing < 0) {
        if (controller.up.isPressed()) {
            pointing = shipForward.length - 1
        } else {
            pointing = shipIdle.length - 1
        }
    } else {
        if (pointing >= shipIdle.length) {
            pointing = 0
        }
    }
    if (controller.up.isPressed()) {
        ship.setImage(shipForward[pointing])
    } else {
        ship.setImage(shipIdle[pointing])
    }
}
function createLaser () {
    laser = sprites.createProjectileFromSprite(img`
        8 9 1 1 9 8 
        8 9 1 1 9 8 
        8 9 1 1 9 8 
        `, ship, 0, -80)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    run(ship)
    ship.startEffect(effects.trail)
})
function run (theSprite: Sprite) {
    updatePointing(0)
    theSprite.vy = ySpeed[pointing]
    theSprite.vx = xSpeed[pointing]
    theSprite.ax += xSpeed[pointing] * 1.5
    theSprite.ay += ySpeed[pointing] * 1.5
}
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    run(ship)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    createMissile()
})
function createLaser2 () {
    laser = sprites.createProjectileFromSprite(img`
        8 9 1 1 1 1 1 1 9 8 
        8 9 1 1 1 1 1 1 9 8 
        8 9 1 1 1 1 1 1 9 8 
        `, ship, 0, -80)
    laser.startEffect(effects.fountain)
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    timer.throttle("action", 100, function () {
        updatePointing(1)
    })
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    updatePointing(-1)
})
function createShip () {
    ship = sprites.create(img`
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
    ship.setPosition(80, 110)
    ship.setBounceOnWall(false)
    ship.setStayInScreen(false)
    shipIdle = [
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . b . . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . c b 9 b c . . . . . . 
        . . . . b c 9 9 9 c b . . . . . 
        . . . . c c b f b c c . . . . . 
        . . . . c c b b b c c . . . . . 
        . . . b b c b b b c b b . . . . 
        . . . . . b c 1 c b . . . . . . 
        . . . . . . 7 7 7 . . . . . . . 
        . . . . . . . 7 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . c b b . . . . . 
        . . . . . c b c b 1 b . . . . . 
        . . . b c c b 9 9 b c . . . . . 
        . . . b c c b f 9 c . . . . . . 
        . . . . c b b b b b . . . . . . 
        . . . . 7 1 b c c c . . . . . . 
        . . . . 7 7 c c c . . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . b . . . . . . . . . . 
        . . . . . b c c b . . . . . . . 
        . . . . b c c c c c . . . . . . 
        . . . 7 c b b b 9 b b . . . . . 
        . . 7 7 1 b b f 9 9 1 b b . . . 
        . . . 7 c b b b 9 b b . . . . . 
        . . . . b c c c c c . . . . . . 
        . . . . . b c c b . . . . . . . 
        . . . . . b . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . 7 7 c c c . . . . . . . 
        . . . . 7 1 b c c c . . . . . . 
        . . . . c b b b b b . . . . . . 
        . . . b c c b f 9 c . . . . . . 
        . . . b c c b 9 9 b c . . . . . 
        . . . . . c b c b 1 b . . . . . 
        . . . . . . . . c b b . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 . . . . . . . . 
        . . . . . . 7 7 7 . . . . . . . 
        . . . . . b c 1 c b . . . . . . 
        . . . b b c b b b c b b . . . . 
        . . . . c c b b b c c . . . . . 
        . . . . c c b f b c c . . . . . 
        . . . . b c 9 9 9 c b . . . . . 
        . . . . . c b 9 b c . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . . b . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . b b . . . . . . . . 
        . . . . . . c c c 7 7 . . . . . 
        . . . . . c c c b 1 7 . . . . . 
        . . . . . b b b b b c . . . . . 
        . . . . . c 9 f b c c b . . . . 
        . . . . c b 9 9 b c c b . . . . 
        . . . . b 1 b c b c . . . . . . 
        . . . . b b c . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . b . . . . . . 
        . . . . . . b c c b . . . . . . 
        . . . . . c c c c c b . . . . . 
        . . . . b b 9 b b b c 7 . . . . 
        . . b b 1 9 9 f b b 1 7 7 . . . 
        . . . . b b 9 b b b c 7 . . . . 
        . . . . . c c c c c b . . . . . 
        . . . . . . b c c b . . . . . . 
        . . . . . . . . . b . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . b b c . . . . . . . . . 
        . . . . b 1 b c b c . . . . . . 
        . . . . c b 9 9 b c c b . . . . 
        . . . . . c 9 f b c c b . . . . 
        . . . . . b b b b b c . . . . . 
        . . . . . c c c b 1 7 . . . . . 
        . . . . . . c c c 7 7 . . . . . 
        . . . . . . b b . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `
    ]
    shipForward = [
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . b . . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . c b 9 b c . . . . . . 
        . . . . b c 9 9 9 c b . . . . . 
        . . . . c c b f b c c . . . . . 
        . . . . c c b b b c c . . . . . 
        . . . b b c b b b c b b . . . . 
        . . . . . b c 1 c b . . . . . . 
        . . . . . . 7 5 7 . . . . . . . 
        . . . . . 7 7 5 7 7 . . . . . . 
        . . . . . . 7 7 7 . . . . . . . 
        . . . . . . . 7 . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . c b b . . . . . 
        . . . . . c b c b 1 b . . . . . 
        . . . b c c b 9 9 b c . . . . . 
        . . . b c c b f 9 c . . . . . . 
        . . . . c b b b b b . . . . . . 
        . . 7 7 7 5 b c c c . . . . . . 
        . . . 7 5 7 c c c . . . . . . . 
        . . 7 7 7 7 . b b . . . . . . . 
        . . . 7 . 7 . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . b . . . . . . . . . 
        . . . . . . b c c b . . . . . . 
        . . . 7 . b c c c c c . . . . . 
        . . 7 7 7 c b b b 9 b b . . . . 
        . 7 7 5 5 1 b b f 9 9 1 b b . . 
        . . 7 7 7 c b b b 9 b b . . . . 
        . . . 7 . b c c c c c . . . . . 
        . . . . . . b c c b . . . . . . 
        . . . . . . b . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 7 . 7 . . . . . . . . . . 
        . . 7 7 7 7 . b b . . . . . . . 
        . . . 7 5 7 c c c . . . . . . . 
        . . 7 7 7 5 b c c c . . . . . . 
        . . . . c b b b b b . . . . . . 
        . . . b c c b f 9 c . . . . . . 
        . . . b c c b 9 9 b c . . . . . 
        . . . . . c b c b 1 b . . . . . 
        . . . . . . . . c b b . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 . . . . . . . . 
        . . . . . . 7 7 7 . . . . . . . 
        . . . . . 7 7 5 7 7 . . . . . . 
        . . . . . . 7 5 7 . . . . . . . 
        . . . . . b c 1 c b . . . . . . 
        . . . b b c b b b c b b . . . . 
        . . . . c c b b b c c . . . . . 
        . . . . c c b f b c c . . . . . 
        . . . . b c 9 9 9 c b . . . . . 
        . . . . . c b 9 b c . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . . b . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 7 . 7 . . . . 
        . . . . . . b b . 7 7 7 7 . . . 
        . . . . . . c c c 7 5 7 . . . . 
        . . . . . c c c b 5 7 7 7 . . . 
        . . . . . b b b b b c . . . . . 
        . . . . . c 9 f b c c b . . . . 
        . . . . c b 9 9 b c c b . . . . 
        . . . . b 1 b c b c . . . . . . 
        . . . . b b c . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . b . . . . . . 
        . . . . . . b c c b . . . . . . 
        . . . . . c c c c c b . 7 . . . 
        . . . . b b 9 b b b c 7 7 7 . . 
        . . b b 1 9 9 f b b 1 5 5 7 7 . 
        . . . . b b 9 b b b c 7 7 7 . . 
        . . . . . c c c c c b . 7 . . . 
        . . . . . . b c c b . . . . . . 
        . . . . . . . . . b . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . b b c . . . . . . . . . 
        . . . . b 1 b c b c . . . . . . 
        . . . . c b 9 9 b c c b . . . . 
        . . . . . c 9 f b c c b . . . . 
        . . . . . b b b b b c . . . . . 
        . . . . . c c c b 5 7 7 7 . . . 
        . . . . . . c c c 7 5 7 . . . . 
        . . . . . . b b . 7 7 7 7 . . . 
        . . . . . . . . . 7 . 7 . . . . 
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
}
controller.B.onEvent(ControllerButtonEvent.Repeated, function () {
    bigLaser = 1
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    updatePointing(1)
})
function createMissile () {
    timer.throttle("action", 500, function () {
        missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . 
            . . . 2 2 2 2 . . . 
            . . 2 4 4 4 4 2 . . 
            . 2 4 4 5 5 4 4 2 . 
            . 2 4 5 5 5 5 4 2 . 
            . 2 4 5 5 5 5 4 2 . 
            . 2 4 4 5 5 4 4 2 . 
            . . 2 4 4 4 4 2 . . 
            . . . 2 2 2 2 . . . 
            . . . . . . . . . . 
            `, ship, 0, -80)
        missile.startEffect(effects.fire)
        shoot(missile)
    })
}
function shoot (theSprite: Sprite) {
    theSprite.vy = ySpeed[pointing] * 3
    theSprite.vx = xSpeed[pointing] * 3
}
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    effects.clearParticles(ship)
    ship.ay = 0
    ship.ax = 0
    for (let index = 0; index < 3; index++) {
        pause(100)
        ship.vy = ship.vy / 2
        ship.vx = ship.vx / 2
    }
    ship.vy = 0
    ship.vx = 0
    updatePointing(0)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    createMissile()
})
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    bigLaser = 0
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    timer.throttle("action", 100, function () {
        updatePointing(-1)
    })
})
let missile: Sprite = null
let bigLaser = 0
let xSpeed: number[] = []
let ySpeed: number[] = []
let laser: Sprite = null
let ship: Sprite = null
let shipIdle: Image[] = []
let shipForward: Image[] = []
let pointing = 0
effects.starField.startScreenEffect()
tiles.setTilemap(tilemap`level1`)
createShip()
game.onUpdate(function () {
    if (controller.B.isPressed()) {
        if (bigLaser == 0) {
            createLaser()
        } else {
            createLaser2()
            scene.cameraShake(2, 100)
        }
    }
})
