import { IconButton } from '@chakra-ui/react'
import { MdBookmarks } from 'react-icons/md'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <IconButton
        variant="outline"
        colorScheme="red"
        aria-label="Bookmark"
        size="sm"
        fontSize="20px"
        icon={<MdBookmarks />}
      />
    </div>
  )
}

export default App
