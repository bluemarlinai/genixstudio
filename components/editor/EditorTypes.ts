
import React from 'react';

export type BackgroundPreset = {
  id: string;
  name: string;
  class?: string;
  style?: React.CSSProperties;
  thumbnail: string; // 改为 string
};

export type DecorationPreset = {
  id: string;
  name: string;
  isVip?: boolean;
  template: string;
  icon: string; // 改为图标名
};

export type BrandPreset = {
  id: string;
  name: string;
  component: string;
  icon: string; // 改为图标名
};

export type SnippetPreset = {
  id: string;
  name: string;
  type: 'HEADER' | 'FOOTER';
  content: string;
  icon: string; // 改为图标名
};

export type SidebarTab = 'BACKGROUND' | 'DECORATION' | 'BRAND' | 'PRESETS';
