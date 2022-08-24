/* eslint-disable no-use-before-define */
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

describe('<Note />', () => {
  test('renders content', () => {
    const note = {
      content: 'this is a test',
      important: true
    }

    const component = render(<Note note={note} />)

    component.getByText('this is a test')

    // expect(component.container).toHaveTextContent(note.content)

    // const li = component.container.querySelector('li')
    // console.log(prettyDOM(li))
  })
})
