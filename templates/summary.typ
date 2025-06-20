#import "template.typ": *

#set heading(numbering: none)

#show heading.where(level: 1): it => [
    #set align(right)
    #set text(font: "Concourse C2", weight: "regular", size: 24pt)
    #block(it.body)
]

= Summary

#v(1fr)

#context {
  for (name, items) in summary-state.get() {
      text(size: 18pt)[*#name*]
      v(1em)
      if type(items) == array {
          for item in items {
              list(indent: 1em, eval(item, mode: "markup"))
          }
      } else {
          h(1.5em)
          eval(items, mode: "markup")
          v(1em)
      }
  }
}
#v(1fr)

#pagebreak()
