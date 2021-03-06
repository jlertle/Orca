'use strict'

const Operator = require('../operator')

function OperatorCC (orca, x, y) {
  Operator.call(this, orca, x, y, '^', true)

  this.name = 'Midi CC'
  this.info = 'Sends a MIDI control change message.'

  this.ports.haste.channel = { x: 1, y: 0, default: -1, clamp: { min: 0, max: 15 } }
  this.ports.haste.knob = { x: 2, y: 0, default: -1, clamp: { min: 0 } }
  this.ports.input.value = { x: 3, y: 0, clamp: { min: 0 } }

  this.operation = function (force = false) {
    if (!this.hasNeighbor('*') && force === false) { return }

    const channel = this.listen(this.ports.haste.channel, true)
    const knob = this.listen(this.ports.haste.knob, true)
    const rawValue = this.listen(this.ports.input.value, true)

    if (channel === -1) { return }
    if (knob === -1) { return }

    const val = Math.ceil((127 * rawValue) / 35)

    this.draw = false
    terminal.io.cc.send(channel, knob, val)

    if (force === true) {
      terminal.io.cc.run()
    }
  }
}

module.exports = OperatorCC
