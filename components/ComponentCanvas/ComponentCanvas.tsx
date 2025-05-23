import { useState } from 'react';
import cx from 'clsx';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Box, MantineThemeProvider } from '@mantine/core';
import { getCodeFileIcon } from '@mantinex/dev-icons';
import { UiComponent } from '../../data';
import * as UiComponents from '../../lib';
import { ComponentPreview } from '../ComponentPreview/ComponentPreview';
import { CanvasHeader } from './CanvasHeader/CanvasHeader';
import classes from './ComponentCanvas.module.css';

export function ComponentCanvas(props: UiComponent & { zIndex: number }) {
  const [state, setState] = useState('preview');
  const [primaryColor, setPrimaryColor] = useState('blue');
  const Component: any = UiComponents[props.component as keyof typeof UiComponents];

  return (
    <div className={classes.canvas}>
      <CanvasHeader
        {...props}
        state={state}
        primaryColor={primaryColor}
        onStateChange={setState}
        onPrimaryColorChange={setPrimaryColor}
      />

      <div
        className={cx(classes.body, {
          [classes.bodyWithCode]: state === 'code',
          [classes.bodyRaw]: !props.attributes.canvas.center,
        })}
      >
        {state === 'preview' ? (
          <Box
            mod={{ dimmed: props.attributes.dimmed }}
            className={classes.preview}
            style={{ zIndex: props.zIndex }}
          >
            <ComponentPreview canvas={props.attributes.canvas}>
              <MantineThemeProvider inherit theme={{ primaryColor }}>
                <Component {...props.attributes.props} />
              </MantineThemeProvider>
            </ComponentPreview>
          </Box>
        ) : (
          <Box pos="relative">
            <CodeHighlightTabs code={props.code as any} getFileIcon={getCodeFileIcon} />
          </Box>
        )}
      </div>
    </div>
  );
}
