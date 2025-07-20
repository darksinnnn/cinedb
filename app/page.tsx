"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import HomeScreen from './screens/HomeScreen';

// This is the root page that automatically redirects to the home screen
export default function Page() {
  // For Next.js 13+ App Router, we can directly render the HomeScreen component
  return <HomeScreen />;
}