import { MdBookmarks } from "react-icons/md";

import { useDisclosure } from "@mantine/hooks";
import { MantineProvider, ActionIcon, Drawer } from "@mantine/core";

const App = (): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="App">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Drawer opened={opened} onClose={close} title="Authentication">
          {/* Drawer content */}
        </Drawer>
        <ActionIcon
          color="blue"
          size="sm"
          radius="xs"
          variant="filled"
          onClick={open}
        >
          <MdBookmarks size="0.875rem" />
        </ActionIcon>
      </MantineProvider>
    </div>
  );
};

export default App;
