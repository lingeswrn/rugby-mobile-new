# Picker
a (hopefully?) cross-platform component that serves as the default Select for all components.

## Usage
`import { Picker } from 'lib/components/Picker'`

| prop           | type             | default   | description                                                                                                                                 |
| -------------- | ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| items          | array            | []        | options the picker should render. Each item should be one of: Number, String, Object w/ shape `{ label: <string>, value: <string|number> }` |
| initialValue   | string or Number | undefined | starting value. Obviously, should be a valid option in `items` array                                                                        |
| onChange       | function         | undefined | value change listener; takes `value` as its sole argument                                                                                   |
| style          | Object           | {}        | style object for picker                                                                                                                     |
| containerStyle | Object           | {}        | style object for `<View>` wrapper                                                                                                           |
