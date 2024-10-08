import { ReactNode, useState } from 'react';

import { Box, BoxProps } from './Box';
import { Button } from './Button';

type Props = Partial<{
  /** Buttons or other content to render inline with the button */
  buttons: ReactNode;
  /** Icon to display with the collapsible */
  icon: string;
  /** Whether the collapsible is open */
  open: boolean;
  /** Text to display on the button for collapsing */
  title: ReactNode;
}> &
  BoxProps;

export function Collapsible(props: Props) {
  const { children, color, title, buttons, icon, ...rest } = props;
  const [open, setOpen] = useState(props.open);

  return (
    <Box mb={1}>
      <div className="Table">
        <div className="Table__cell">
          <Button
            fluid
            color={color}
            icon={icon ? icon : open ? 'chevron-down' : 'chevron-right'}
            onClick={() => setOpen(!open)}
            {...rest}
          >
            {title}
          </Button>
        </div>
        {buttons && (
          <div className="Table__cell Table__cell--collapsing">{buttons}</div>
        )}
      </div>
      {open && <Box mt={1}>{children}</Box>}
    </Box>
  );
}
