import { MdBookmarks } from "react-icons/md";

import { useDisclosure } from "@mantine/hooks";
import { MantineProvider, ActionIcon, Drawer, Select } from "@mantine/core";

const App = (): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="App">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Drawer size="xs" opened={opened} onClose={close} title="ブクマく">
          <Select
            label="Your favorite framework/library"
            placeholder="Pick one"
            data={[
              { value: "react", label: "React" },
              { value: "ng", label: "Angular" },
              { value: "svelte", label: "Svelte" },
              { value: "vue", label: "Vue" },
            ]}
          />
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
