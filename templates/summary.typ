#import "template.typ": *

#set heading(numbering: (..nums) => {
  let sequence = nums.pos()
  // discard first entry (chapter number)
  let _ = sequence.remove(0)
})

#show heading.where(level: 2): it => [
    #set align(right)
    #set text(font: "Concourse C2", weight: "regular", size: 24pt)
    #block(it.body)
]

== Summary

#v(1fr)

#context {
  for (name, items) in summary-state.get() {
      text(size: 18pt)[*#name*]
      v(1em)
      if type(items) == array {
          for item in items {
              list(indent: 1em, item)
          }
      } else {
          h(1.5em)
          items
          v(1em)
      }
  }
}
#v(1fr)

#pagebreak()