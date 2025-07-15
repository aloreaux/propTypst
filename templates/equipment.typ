#import "template.typ": *

= Equipment Summary

#set align(horizon)
#context {
  for (room, data) in equip-state.get() {
    if data.newPage == true {
      pagebreak()
    }
    text(size: 18pt)[*#room*]
    linebreak()
    for item in data.items {
      list(indent: 1em)[
        #eval(item, mode: "markup")
      ]
    }
  }
}

#pagebreak()
