import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export default interface NavbarItem {
  text: string;
  isNavHeader?: boolean;
  icon: ReactJSXElement | null;
}
