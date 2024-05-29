import React, { useState } from 'react';

import Analystic from '@/components/analystic/index';
import Sidebar from '@/components/layout/sidebar'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat2Data',
  description: 'Chat With Data',
}


// CircleChevronRight
export default function Home() {
  return (
      <div className="flex flex-row h-screen w-full">
        <div className="w-full">< Analystic /></div>
      </div>
  );
}
