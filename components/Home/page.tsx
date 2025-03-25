'use client';

import { useState } from 'react';
import {
  Button,
  Container,
  Text,
  Title,
  TextInput,
  Group,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import Ansi from 'ansi-to-html';
import classes from './Hero-text.module.css';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [fontColor, setFontColor] = useState('\u001b[37m'); // Default white
  const [bgColor, setBgColor] = useState('\u001b[40m'); // Default black

  const ansi = new Ansi();

  // Foreground color options
  const fgColors = [
    { hex: '#6b7280', ansi: '\u001b[30;1m' }, // Gray
    { hex: '#ff0000', ansi: '\u001b[31m' }, // Red
    { hex: '#00ff00', ansi: '\u001b[32m' }, // Green
    { hex: '#0000ff', ansi: '\u001b[34m' }, // Blue
    { hex: '#ff00ff', ansi: '\u001b[35m' }, // Magenta
    { hex: '#00ffff', ansi: '\u001b[36m' }, // Cyan
    { hex: '#ffffff', ansi: '\u001b[37m' }, // White
    { hex: '#d1d5db', ansi: '\u001b[37;1m' }, // Light gray
  ];

  // Background color options
  const bgColors = [
    { hex: '#6b7280', ansi: '\u001b[40;1m' }, // Gray
    { hex: '#ff4500', ansi: '\u001b[41m' }, // Orange
    { hex: '#4b5563', ansi: '\u001b[100m' }, // Dark gray
    { hex: '#1f2937', ansi: '\u001b[40m' }, // Darker gray
    { hex: '#2563eb', ansi: '\u001b[44m' }, // Blue
    { hex: '#9333ea', ansi: '\u001b[45m' }, // Purple
    { hex: '#d1d5db', ansi: '\u001b[47m' }, // Light gray
    { hex: '#ffffff', ansi: '\u001b[107m' }, // White
  ];

  // Generate ANSI text for preview
  const generateAnsiText = () => {
    if (!inputText) return 'Type something above!';
    return `${fontColor}${bgColor}${inputText}\u001b[0m`;
  };

  // Generate Discord-formatted text for copying
  const generateOutput = () => {
    if (!inputText) return '```ansi\nType something above!\n```';
    return `\`\`\`ansi\n${fontColor}${bgColor}${inputText}\u001b[0m\n\`\`\``;
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateOutput());
  };

  // Reset all settings
  const resetAll = () => {
    setInputText('');
    setFontColor('\u001b[37m');
    setBgColor('\u001b[40m');
  };

  // Toggle bold formatting
  const toggleBold = () => {
    setInputText((prev) => (prev.includes('**') ? prev.replace(/\*\*/g, '') : `**${prev}**`));
  };

  // Add a new line
  const addLine = () => {
    setInputText((prev) => prev + '\n');
  };

  return (
    <Container className={classes.wrapper} size={1000}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          Rebane's{' '}
          <Text component="span" inherit style={{ color: 'light-dark(#5865F2, #7983f5)' }}>
            Discord
          </Text>{' '}
          Colored Text Generator
        </Title>

        <Title order={2} style={{ textAlign: 'center',color:"dimmed" }} size="h3" >
          About
        </Title>
        <Container p={2} size={500}>
          <Text size="lg" c="dimmed" p={5} className={classes.description}>
            This is a simple app that creates colored Discord messages using the ANSI color codes available on the latest Discord desktop versions.
            <br /><br />
            To use this, write your text, select parts of it and assign colors to them, then copy it using the button below, and send in a Discord message.
          </Text>
        </Container>

        <Container p={2} size={400}>
          <Title order={2} style={{ textAlign: 'center',color:"dimmed" }} size="h3">
            Source Code
          </Title>
          <Text size="lg" c="dimmed" p={5} className={classes.description}>
            This app runs entirely in your browser and the source code is freely available on <a href="https://github.com/sreehhari/discord_colored_text"> GitHub</a>. Shout out to kkrypt0nn for <a href="https://gist.github.com/kkrypt0nn/a02506f3712ff2d1c8ca7c9e0aed7c06">this guide</a>.
          </Text>
        </Container>

        <Container p={2} size={400}>
          <Title order={2} style={{ textAlign: 'center',color:"dimmed" }} size="h3">
            Create Your Text
          </Title>

          {/* Input Field */}
          <TextInput
            placeholder="CREATE YOUR TEXT"
            value={inputText}
            onChange={(e) => setInputText(e.currentTarget.value)}
            size="md"
            styles={{
              input: { backgroundColor: '#f5f5f5', border: '1px solid #d1d5db' },
            }}
          />

          {/* Control Buttons */}
          <Group justify="center" gap="xs" mt="xs">
            <Button variant="outline" size="xs" color="gray" onClick={resetAll}>
              Reset All
            </Button>
            <Button variant="outline" size="xs" color="gray" onClick={toggleBold}>
              Bold
            </Button>
            <Button variant="outline" size="xs" color="gray" onClick={addLine}>
              Line
            </Button>
          </Group>

          {/* Foreground Color Swatches */}
          <Group justify="center" gap="xs" mt="sm">
            <Text size="sm" fw={500}>FG</Text>
            {fgColors.map((color) => (
              <Tooltip key={color.hex} label={color.hex} position='top'>
              <ActionIcon
                key={color.hex}
                style={{ backgroundColor: color.hex, width: 24, height: 24 }}
                onClick={() => setFontColor(color.ansi)}
              />
              </Tooltip>
            ))}
          </Group>

          {/* Background Color Swatches */}
          <Group justify="center" gap="xs" mt="xs">
            <Text size="sm" fw={500}>BG</Text>
            {bgColors.map((color) => (
              <Tooltip key={color.hex} label={color.hex} position='top'>
              <ActionIcon
                key={color.hex}
                style={{ backgroundColor: color.hex, width: 24, height: 24 }}
                onClick={() => setBgColor(color.ansi)}
              />
              </Tooltip>
            ))}
          </Group>

          {/* Preview Label */}
          <Text size="sm" fw={500} mt="md">Preview</Text>

          {/* Preview Area */}
          <div
            style={{
              backgroundColor: '#2f3136',
              color: '#ffffff',
              fontFamily: 'monospace',
              padding: '10px',
              borderRadius: '4px',
              whiteSpace: 'pre-wrap',
              minHeight: '100px',
              border: '1px solid #4b5563',
              userSelect: 'none',
            }}
            dangerouslySetInnerHTML={{ __html: ansi.toHtml(generateAnsiText()) }}
          />

          {/* Note */}
          <Text size="sm" color="dimmed" mt="sm">
            Note: ANSI color codes only work on Discord desktop, you can use them on mobile by copying the text from this tool.
          </Text>

          {/* Copy Button */}
          <Button
            onClick={copyToClipboard}
            color="gray"
            size="md"
            fullWidth
            variant="outline"
            mt="sm"
          >
            Copy text as Discord formatted
          </Button>
        </Container>

        {/* Footer */}
        <Text size="xs" color="dimmed" style={{ textAlign: 'center' }} mt="lg">
          This is an unofficial tool, it is not made or endorsed by Discord.
        </Text>
      </div>
    </Container>
  );
};

export default Home;