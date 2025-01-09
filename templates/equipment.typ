#import "template.typ": *

= Equipment Summary

#set align(horizon)
#context {
  for (room, items) in equip-state.get() {
    text(size: 18pt)[*#room*]
    linebreak()
    for item in items {
      list(indent: 1em)[
        #item
      ]
    }
  }
}

#pagebreak()