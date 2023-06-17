import Phaser from './lib/phaser.js'

import Game from './scenes/Game.js'

export default new Phaser.Game({
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	parent: "game",
	scene: [Game],
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 200
			},
			debug: false
		}
	}
})
