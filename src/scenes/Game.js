import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
  /** @type {Phaser.GameObjects.Text} */
  Text;

  constructor() {
    super("game");
  }

  preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("photon", "assets/photon.png");
    this.load.image("gluon", "assets/gluon.png");
    this.load.image("electron", "assets/electron.png");
    this.load.image("bottomQuark", "assets/quarks/bottomQuark.png");
    this.load.image("charmQuark", "assets/quarks/charmQuark.png");
    this.load.image("downQuark", "assets/quarks/downQuark.png");
    this.load.image("strangeQuark", "assets/quarks/strangeQuark.png");
    this.load.image("topQuark", "assets/quarks/topQuark.png");
    this.load.image("upQuark", "assets/quarks/upQuark.png");
    this.load.image("circle", "assets/circle.png");
    this.load.image("proton", "assets/proton.png");
    this.load.image("neutron", "assets/neutron.png");
  }

  create() {
    this.getbar = "open";

    this.add.image(window.innerWidth / 2, window.innerHeight / 2, "background");

    this.cam = this.cameras.main;
    this.cam.setBounds(0, 0, 2048, 1000);
    this.physics.world.setBounds(0, 0, 2048, 1000);

    //mouse follow
    this.circle = this.physics.add
      .sprite(0, 0, "circle")
      .setImmovable(true)
      .setScale(0.5);
    this.circle.body.setAllowGravity(false);

    //  Camera controls
    const cursors = this.input.keyboard.createCursorKeys();

    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0,
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    );

    //Physics groups
    this.gluons = this.physics.add.group({
      key: "gluon",
      allowGravity: false,
      repeat: 5,
      setXY: { x: 50, y: 400, stepX: 200, stepY: 20 },
    });

    this.electrons = this.physics.add.group({
      key: "electron",
      allowGravity: true,
      repeat: 5,
      setXY: { x: 50, y: 450, stepX: 200, stepY: 20 },
    });

    this.photons = this.physics.add.group({
      key: "photon",
      allowGravity: true,
      repeat: 5,
      setXY: { x: 50, y: 50, stepX: 200, stepY: 20 },
    });

    this.bottomQuarks = this.physics.add.group({
      key: "bottomQuark",
      allowGravity: false,
      allowDrag: true,
      repeat: 5,
      setXY: { x: 50, y: 100, stepX: 200, stepY: 20 },
    });
    this.charmQuarks = this.physics.add.group({
      key: "charmQuark",
      allowGravity: false,
      repeat: 5,
      setXY: { x: 50, y: 150, stepX: 200, stepY: 20 },
    });
    this.downQuarks = this.physics.add.group({
      key: "downQuark",
      allowGravity: false,
      repeat: 5,
      setXY: { x: 50, y: 200, stepX: 200, stepY: 20 },
    });
    this.strangeQuarks = this.physics.add.group({
      key: "strangeQuark",
      allowGravity: false,
      repeat: 5,
      setXY: { x: 50, y: 250, stepX: 200, stepY: 20 },
    });
    this.topQuarks = this.physics.add.group({
      key: "topQuark",
      allowGravity: false,
      repeat: 5,
      setXY: { x: 50, y: 300, stepX: 200, stepY: 20 },
    });
    this.upQuarks = this.physics.add.group({
      key: "upQuark",
      allowGravity: false,
      repeat: 5,
      setXY: { x: 50, y: 350, stepX: 200, stepY: 20 },
    });
    this.protons = this.physics.add.group({
      key: "proton",
      allowGravity: true,
      repeat: -1,
      setXY: { x: -50, y: -50, stepX: 200, stepY: 20 },
    });
    this.neutrons = this.physics.add.group({
      key: "neutron",
      allowGravity: true,
      repeat: -1,
      setXY: { x: -50, y: -50, stepX: 200, stepY: 20 },
    });

    this.input.on("drag", (pointer) => {
      if (this.selected) {
        this.selected.setPosition(pointer.worldX, pointer.worldY);
      }
    });

    this.input.on("dragend", (pointer) => {
      if (this.selected) {
        this.selected.setPosition(pointer.worldX, pointer.worldY);
        this.selected = null;
      }
    });

    this.physics.world.on("worldbounds", (photon) => {
      let newAngle = new Phaser.Math.Vector2(photon.velocity).angle();
      photon.gameObject.setRotation(newAngle);
    });

    this.physics.add.collider(this.photons, this.photons, (p1, p2) => {
      let newAngle = new Phaser.Math.Vector2(p1.body.velocity).angle();
      p1.setRotation(newAngle);
      newAngle = new Phaser.Math.Vector2(p2.body.velocity).angle();
      p2.setRotation(newAngle);
    });
    this.physics.add.collider(this.photons, this.bottomQuarks, (p1, p2) => {
      let newAngle = new Phaser.Math.Vector2(p1.body.velocity).angle();
      p1.setRotation(newAngle);
    });
    this.physics.add.collider(this.photons, this.charmQuarks, (p1, p2) => {
      let newAngle = new Phaser.Math.Vector2(p1.body.velocity).angle();
      p1.setRotation(newAngle);
    });
    this.physics.add.collider(this.photons, this.downQuarks, (p1, p2) => {
      let newAngle = new Phaser.Math.Vector2(p1.body.velocity).angle();
      p1.setRotation(newAngle);
    });
    this.physics.add.collider(this.photons, this.strangeQuarks, (p1, p2) => {
      let newAngle = new Phaser.Math.Vector2(p1.body.velocity).angle();
      p1.setRotation(newAngle);
    });
    this.physics.add.collider(this.photons, this.topQuarks, (p1, p2) => {
      let newAngle = new Phaser.Math.Vector2(p1.body.velocity).angle();
      p1.setRotation(newAngle);
    });
    this.physics.add.collider(this.photons, this.upQuarks, (p1, p2) => {
      let newAngle = new Phaser.Math.Vector2(p1.body.velocity).angle();
      p1.setRotation(newAngle);
    });
    this.physics.add.collider(this.photons, this.protonss, (p1, p2) => {
      let newAngle = new Phaser.Math.Vector2(p1.body.velocity).angle();
      p1.setRotation(newAngle);
    });
    this.physics.add.collider(this.photons, this.neutrons, (p1, p2) => {
      let newAngle = new Phaser.Math.Vector2(p1.body.velocity).angle();
      p1.setRotation(newAngle);
    });
    this.physics.add.collider([
      this.photons,
      this.bottomQuarks,
      this.charmQuarks,
      this.downQuarks,
      this.strangeQuarks,
      this.topQuarks,
      this.upQuarks,
      this.protons,
      this.neutrons
    ]);

    this.input.on(
      "pointermove",
      function (pointer) {
        this.circle.setPosition(pointer.worldX, pointer.worldY);
      },
      this
    );

    //child iteration
    this.bottomQuarks.children.iterate(function (child) {
      child.setVelocity(
        Phaser.Math.Between(-30, 30),
        Phaser.Math.Between(-30, 30)
      );
    }, this);

    this.charmQuarks.children.iterate(function (child) {
      child.setVelocity(
        Phaser.Math.Between(-30, 30),
        Phaser.Math.Between(-30, 30)
      );
    }, this);

    this.downQuarks.children.iterate(function (child) {
      child.setVelocity(
        Phaser.Math.Between(-30, 30),
        Phaser.Math.Between(-30, 30)
      );
    }, this);

    this.strangeQuarks.children.iterate(function (child) {
      child.setVelocity(
        Phaser.Math.Between(-30, 30),
        Phaser.Math.Between(-30, 30)
      );
    }, this);

    this.topQuarks.children.iterate(function (child) {
      child.setVelocity(
        Phaser.Math.Between(-30, 30),
        Phaser.Math.Between(-30, 30)
      );
    }, this);

    this.upQuarks.children.iterate(function (child) {
      child.setVelocity(
        Phaser.Math.Between(-30, 30),
        Phaser.Math.Between(-30, 30)
      );
    }, this);

    this.gluons.children.iterate(function (child) {
      child.setVelocity(
        Phaser.Math.Between(-30, 30),
        Phaser.Math.Between(-30, 30)
      );
    }, this);

    this.electrons.children.iterate(function (child) {
      child.setVelocity(
        Phaser.Math.Between(-30, 30),
        Phaser.Math.Between(-30, 30)
      );
    }, this);

    this.neutrons.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
        this.selected.setVelocity(0, 0);
      });
    }, this);

    this.protons.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
        this.selected.setVelocity(0, 0);
      });
      
    }, this);

    this.photons.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.setVelocity(
        Phaser.Math.Between(-1000, 1000),
        Phaser.Math.Between(-1000, 1000)
      );
      let initialAngle = new Phaser.Math.Vector2(child.body.velocity).angle();
      child.setRotation(initialAngle);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
      });
    }, this);


    //menu buttons
    document.querySelector("#gluons").addEventListener(
      "click",
      function (pointer) {
        this.gluons.create(
          Phaser.Math.Between(0, 1000),
          Phaser.Math.Between(0, 1000),
          "gluon"
        );
      }.bind(this)
    );
    document.querySelector("#electrons").addEventListener(
      "click",
      function (pointer) {
        this.electrons.create(
          Phaser.Math.Between(0, 1000),
          Phaser.Math.Between(0, 1000),
          "electron"
        );
      }.bind(this)
    );
    document.querySelector("#upQuark").addEventListener(
      "click",
      function (pointer) {
        this.upQuarks.create(
          Phaser.Math.Between(0, 1000),
          Phaser.Math.Between(0, 1000),
          "upQuark"
        );
      }.bind(this)
    );
    document.querySelector("#downQuark").addEventListener(
      "click",
      function (pointer) {
        this.downQuarks.create(
          Phaser.Math.Between(0, 1000),
          Phaser.Math.Between(0, 1000),
          "downQuark"
        );
      }.bind(this)
    );
    document.querySelector("#charmQuark").addEventListener(
      "click",
      function (pointer) {
        this.charmQuarks.create(
          Phaser.Math.Between(0, 1000),
          Phaser.Math.Between(0, 1000),
          "charmQuark"
        );
      }.bind(this)
    );
    document.querySelector("#strangeQuark").addEventListener(
      "click",
      function (pointer) {
        this.strangeQuarks.create(
          Phaser.Math.Between(0, 1000),
          Phaser.Math.Between(0, 1000),
          "strangeQuark"
        );
      }.bind(this)
    );
    document.querySelector("#topQuark").addEventListener(
      "click",
      function (pointer) {
        this.topQuarks.create(
          Phaser.Math.Between(0, 1000),
          Phaser.Math.Between(0, 1000),
          "topQuark"
        );
      }.bind(this)
    );
    document.querySelector("#bottomQuark").addEventListener(
      "click",
      function (pointer) {
        this.bottomQuarks.create(
          Phaser.Math.Between(0, 1000),
          Phaser.Math.Between(0, 1000),
          "bottomQuark"
        );
      }.bind(this)
    );
    document.querySelector("#neutrons").addEventListener(
      "click",
      function (pointer) {
        this.neutrons.create(
          Phaser.Math.Between(0, 1000),
          Phaser.Math.Between(0, 1000),
          "neutron"
        );
      }.bind(this)
    );
    document.querySelector("#protons").addEventListener(
      "click",
      function (pointer) {
        this.protons.create(
          Phaser.Math.Between(0, 1000),
          Phaser.Math.Between(0, 1000),
          "proton"
        );
      }.bind(this)
    );
    document.querySelector("#photons").addEventListener(
      "click",
      function (pointer) {
        this.photons.create(
          Phaser.Math.Between(0, 1000),
          Phaser.Math.Between(0, 1000),
          "photon"
        );
      }.bind(this)
    );

    document.getElementById("getbar").style.visibility = "visible";

    document.querySelector("#mini").addEventListener("click", function () {
      let getbar = document.getElementById("getbar");

      console.log(getbar.style.visibility);
      if (getbar.style.visibility == "hidden") {
        getbar.style.visibility = "visible";
      } else {
        getbar.style.visibility = "hidden";
      }
    });

    this.physics.add.overlap(this.circle, this.photons, (p1, p2) => {
      p2.setVelocity(0, 0);
    });
    this.physics.add.overlap(this.circle, this.gluons, (p1, p2) => {
      p2.setVelocity(0, 0);
    });
    this.physics.add.overlap(this.circle, this.electrons, (p1, p2) => {
      p2.setVelocity(0, 0);
    });
    this.physics.add.overlap(this.circle, this.bottomQuarks, (p1, p2) => {
      p2.setVelocity(0, 0);
    });
    this.physics.add.overlap(this.circle, this.charmQuarks, (p1, p2) => {
      p2.setVelocity(0, 0);
    });
    this.physics.add.overlap(this.circle, this.downQuarks, (p1, p2) => {
      p2.setVelocity(0, 0);
    });
    this.physics.add.overlap(this.circle, this.strangeQuarks, (p1, p2) => {
      p2.setVelocity(0, 0);
    });
    this.physics.add.overlap(this.circle, this.topQuarks, (p1, p2) => {
      p2.setVelocity(0, 0);
    });
    this.physics.add.overlap(this.circle, this.upQuarks, (p1, p2) => {
      p2.setVelocity(0, 0);
    });
    this.physics.add.overlap(this.circle, this.protons, (p1, p2) => {
      p2.setVelocity(0, 0);
    });
    this.physics.add.overlap(this.circle, this.neutrons, (p1, p2) => {
      p2.setVelocity(0, 0);
    });

    // proton check
    this.physics.add.overlap(
      [this.gluons, this.upQuarks],
      [this.gluons, this.upQuarks],
      (p1, p2) => {
        // Target is BIG - SMALL - BIG

        if (p1.texture.key == "upQuark") {
          if (p2.texture.key == "gluon") {
            this.upQuarks.children.iterate(function (p3) {
              if (p3 != p1 && this.physics.overlap(p2, p3)) {
                this.gluons.children.iterate(function (p4) {
                  if (p4 != p2 && this.physics.overlap(p3, p4)) {
                    this.downQuarks.children.iterate(function (p5) {
                      if (
                        [p1, p3].indexOf(p5) == -1 &&
                        this.physics.overlap(p4, p5)
                      ) {
                        this.gluons.children.iterate(function (p6) {
                          if (
                            [p2, p4].indexOf(p6) == -1 &&
                            this.physics.overlap(p5, p6) &&
                            this.physics.overlap(p6, p1)
                          ) {
                            this.protons.create(p1.x, p1.y, "proton");
                            p1.destroy();
                            p2.destroy();
                            p3.destroy();
                            p4.destroy();
                            p5.destroy();
                            p6.destroy();
                          }
                        }, this);
                      }
                    }, this);
                  }
                }, this);
              }
            }, this);
          }
        }
      }
    );

    // neutron check
    this.physics.add.overlap(
      [this.gluons, this.downQuarks],
      [this.gluons, this.downQuarks],
      (p1, p2) => {
        // Target is BIG - SMALL - BIG

        if (p1.texture.key == "downQuark") {
          if (p2.texture.key == "gluon") {
            this.downQuarks.children.iterate(function (p3) {
              if (p3 != p1 && this.physics.overlap(p2, p3)) {
                this.gluons.children.iterate(function (p4) {
                  if (p4 != p2 && this.physics.overlap(p3, p4)) {
                    this.upQuarks.children.iterate(function (p5) {
                      if (
                        [p1, p3].indexOf(p5) == -1 &&
                        this.physics.overlap(p4, p5)
                      ) {
                        this.gluons.children.iterate(function (p6) {
                          if (
                            [p2, p4].indexOf(p6) == -1 &&
                            this.physics.overlap(p5, p6) &&
                            this.physics.overlap(p6, p1)
                          ) {
                            this.neutrons.create(p1.x, p1.y, "neutron");
                            p1.destroy();
                            p2.destroy();
                            p3.destroy();
                            p4.destroy();
                            p5.destroy();
                            p6.destroy();
                          }
                        }, this);
                      }
                    }, this);
                  }
                }, this);
              }
            }, this);
          }
        }
      }
    );
  }

  update(time, delta) {
    this.controls.update(delta);

    //child iteration
    this.bottomQuarks.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
      });
    }, this);

    this.charmQuarks.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
      });
    }, this);

    this.downQuarks.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
      });
    }, this);

    this.strangeQuarks.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
      });
    }, this);

    this.topQuarks.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
      });
    }, this);

    this.upQuarks.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
      });
    }, this);

    this.gluons.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
      });
    }, this);

    this.electrons.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
        this.selected.setVelocity(0, 0);
      });
    }, this);

    this.neutrons.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
        this.selected.setVelocity(0, 0);
      });
    }, this);

    this.protons.children.iterate(function (child) {
      child.body.bounce.set(1);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
        this.selected.setVelocity(0, 0);
      });
      
    }, this);

    this.photons.children.iterate(function (child) {
      child.body.bounce.set(1);
      let initialAngle = new Phaser.Math.Vector2(child.body.velocity).angle();
      child.setRotation(initialAngle);
      child.body.collideWorldBounds = true;
      child.body.onWorldBounds = true;
      child.setInteractive({ draggable: true });

      child.on("pointerdown", () => {
        this.selected = child;
      });
    }, this);

  }
}
