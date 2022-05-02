/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import styles from './styles.module.css'; // Using a custom className
// This prevents TOC highlighting to highlight TOCInline/TOCCollapsible by mistake
import {useThemeConfig} from '@docusaurus/theme-common';

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

function SubmitFeedback() {
  const {customFields} = useThemeConfig();
  return (
    <>
      <div className='submit-feedback'>
        <a href={customFields.submitFeedback.href} className='submit-feedback-link'>
          <img src={customFields.submitFeedback.icon} title={customFields.submitFeedback.text} className='submit-feedback-icon'/>
          {customFields.submitFeedback.text}
        </a>
      </div>
    </>
  )
}

function TOC({className, ...props}) {
  return (
    <>
      <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
        <SubmitFeedback />
        <TOCItems
          {...props}
          linkClassName={LINK_CLASS_NAME}
          linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
        />
      </div>
    </>
  );
}

export default TOC;
