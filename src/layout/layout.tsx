import Stack from "@mui/material/Stack";
import { CenterLayout } from "./center-layout";
import { FullPageLayout } from "./full-page-layout";

export const Layout: React.FC = ({ children }) => (
  <FullPageLayout>
    <CenterLayout>
      <Stack>{children}</Stack>
    </CenterLayout>
  </FullPageLayout>
);
