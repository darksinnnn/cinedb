"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import MovieDetailsScreen from '@/app/screens/MovieDetailsScreen';

export default function MovieDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  
  return <MovieDetailsScreen id={id} />;
}