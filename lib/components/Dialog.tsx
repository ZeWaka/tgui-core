import styles from '../styles/components/Dialog.module.scss';
import { Box } from './Box';
import { Button } from './Button';

type DialogProps = {
  children: any;
  height?: string;
  onClose: () => void;
  title: any;
  width?: string;
};

export function Dialog(props: DialogProps) {
  const { title, onClose, children, width, height } = props;
  return (
    <div className={styles.dialog}>
      <Box className={styles.content} width={width || '370px'} height={height}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <Box mr={2}>
            <Button
              mr="-3px"
              width="26px"
              lineHeight="22px"
              textAlign="center"
              color="transparent"
              icon="window-close-o"
              tooltip="Close"
              tooltipPosition="bottom-start"
              onClick={onClose}
            />
          </Box>
        </div>
        {children}
      </Box>
    </div>
  );
}

type DialogButtonProps = {
  children: any;
  onClick: () => void;
};

function DialogButton(props: DialogButtonProps) {
  const { onClick, children } = props;
  return (
    <Button
      onClick={onClick}
      className={styles.button}
      verticalAlignContent="middle"
    >
      {children}
    </Button>
  );
}

Dialog.Button = DialogButton;

type UnsavedChangesDialogProps = {
  documentName: string;
  onClose: () => void;
  onDiscard: () => void;
  onSave: () => void;
};

export function UnsavedChangesDialog(props: UnsavedChangesDialogProps) {
  const { documentName, onSave, onDiscard, onClose } = props;
  return (
    <Dialog title="Notepad" onClose={onClose}>
      <div className={styles.body}>
        Do you want to save changes to {documentName}?
      </div>
      <div className={styles.footer}>
        <DialogButton onClick={onSave}>Save</DialogButton>
        <DialogButton onClick={onDiscard}>Don&apos;t Save</DialogButton>
        <DialogButton onClick={onClose}>Cancel</DialogButton>
      </div>
    </Dialog>
  );
}
