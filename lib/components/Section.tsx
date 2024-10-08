import { forwardRef, ReactNode, RefObject, useEffect } from 'react';

import { addScrollableNode, removeScrollableNode } from '../common/events';
import { canRender, classes } from '../common/react';
import styles from '../styles/components/Section.module.scss';
import { BoxProps, computeBoxClassName, computeBoxProps } from './Box';

type Props = Partial<{
  /** Buttons to render aside the section title. */
  buttons: ReactNode;
  /** id to assosiate with the parent div element used by this section, for uses with procs like getElementByID */
  container_id: string;
  /** If true, fills all available vertical space. */
  fill: boolean;
  /** If true, removes all section padding. */
  fitted: boolean;
  /** @member Callback function for the `scroll` event */
  onScroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  /** Shows or hides the scrollbar. */
  scrollable: boolean;
  /** Shows or hides the horizontal scrollbar. */
  scrollableHorizontal: boolean;
  /** Title of the section. */
  title: ReactNode;
}> &
  BoxProps;

/**
 * ## Section
 * Section is a surface that displays content and actions on a single topic.
 *
 * They should be easy to scan for relevant and actionable information.
 * Elements, like text and images, should be placed in them in a way that
 * clearly indicates hierarchy.
 *
 * Sections can now be nested, and will automatically font size of the
 * header according to their nesting level. Previously this was done via `level`
 * prop, but now it is automatically calculated.
 *
 * Section can also be titled to clearly define its purpose.
 *
 * ```tsx
 * <Section title="Cargo">Here you can order supply crates.</Section>
 * ```
 *
 * If you want to have a button on the right side of an section title
 * (for example, to perform some sort of action), there is a way to do that:
 *
 * ```tsx
 * <Section title="Cargo" buttons={<Button>Send shuttle</Button>}>
 *   Here you can order supply crates.
 * </Section>
 * ```
 */
export const Section = forwardRef(
  (props: Props, forwardedRef: RefObject<HTMLDivElement>) => {
    const {
      buttons,
      children,
      className,
      fill,
      fitted,
      onScroll,
      scrollable,
      scrollableHorizontal,
      title,
      container_id,
      ...rest
    } = props;

    const hasTitle = canRender(title) || canRender(buttons);

    /** We want to be able to scroll on hover, but using focus will steal it from inputs */
    useEffect(() => {
      if (!forwardedRef?.current) return;
      if (!scrollable && !scrollableHorizontal) return;

      addScrollableNode(forwardedRef.current);

      return () => {
        if (!forwardedRef?.current) return;
        removeScrollableNode(forwardedRef.current!);
      };
    }, []);

    return (
      <div
        id={container_id || ''}
        className={classes([
          styles.section,
          fill && styles.fill,
          fitted && styles.fitted,
          scrollable && styles.scrollable,
          scrollableHorizontal && styles.scrollableHorizontal,
          className,
          computeBoxClassName(rest),
        ])}
        {...computeBoxProps(rest)}
      >
        {hasTitle && (
          <div className={styles.title}>
            <span className={styles.titleText}>{title}</span>
            <div className={styles.buttons}>{buttons}</div>
          </div>
        )}
        <div className={styles.rest}>
          <div
            className={styles.content}
            onScroll={onScroll}
            // For posterity: the forwarded ref needs to be here specifically
            // to actually let things interact with the scrolling.
            ref={forwardedRef}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
