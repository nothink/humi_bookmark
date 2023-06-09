import { MdBookmarks } from "react-icons/md";

import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Drawer, Select } from "@mantine/core";

/**
 * ゲーム画面に挿入するためのReact Appをコンポーネント
 * @returns Appのルートコンポーネント
 */
const App = (): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="App">
      <Drawer size="xs" opened={opened} onClose={close} title="Bookmark">
        <Select
          label="User Agent"
          placeholder="Pick one"
          data={[
            { value: "iossafari", label: "iOS Safari" },
            { value: "macchrome", label: "Chrome(Mac)" },
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
    </div>
  );
};

export default App;
