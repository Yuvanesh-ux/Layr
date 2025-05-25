#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { MinecraftAgent } from './minecraft/agent.js';

class LayrMCPServer {
  private server: Server;
  private minecraftAgent: MinecraftAgent;

  constructor() {
    this.server = new Server(
      {
        name: 'layr-minecraft-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.minecraftAgent = new MinecraftAgent();
    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'connect_minecraft',
            description: 'Connect to a Minecraft server',
            inputSchema: {
              type: 'object',
              properties: {
                host: {
                  type: 'string',
                  description: 'Minecraft server host (default: localhost)',
                  default: 'localhost',
                },
                port: {
                  type: 'number',
                  description: 'Minecraft server port (default: 25565)',
                  default: 25565,
                },
                username: {
                  type: 'string',
                  description: 'Bot username',
                },
                version: {
                  type: 'string',
                  description: 'Minecraft version (default: 1.20.4)',
                  default: '1.20.4',
                },
              },
              required: ['username'],
            },
          },
          {
            name: 'disconnect_minecraft',
            description: 'Disconnect from the Minecraft server',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_bot_status',
            description: 'Get the current status of the Minecraft bot',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'move_to_position',
            description: 'Move the bot to a specific position',
            inputSchema: {
              type: 'object',
              properties: {
                x: { type: 'number', description: 'X coordinate' },
                y: { type: 'number', description: 'Y coordinate' },
                z: { type: 'number', description: 'Z coordinate' },
              },
              required: ['x', 'y', 'z'],
            },
          },
          {
            name: 'place_block',
            description: 'Place a block at the specified position',
            inputSchema: {
              type: 'object',
              properties: {
                x: { type: 'number', description: 'X coordinate' },
                y: { type: 'number', description: 'Y coordinate' },
                z: { type: 'number', description: 'Z coordinate' },
                blockType: { type: 'string', description: 'Type of block to place' },
              },
              required: ['x', 'y', 'z', 'blockType'],
            },
          },
          {
            name: 'break_block',
            description: 'Break a block at the specified position',
            inputSchema: {
              type: 'object',
              properties: {
                x: { type: 'number', description: 'X coordinate' },
                y: { type: 'number', description: 'Y coordinate' },
                z: { type: 'number', description: 'Z coordinate' },
              },
              required: ['x', 'y', 'z'],
            },
          },
          {
            name: 'scan_area',
            description: 'Scan an area and return block information',
            inputSchema: {
              type: 'object',
              properties: {
                x1: { type: 'number', description: 'Start X coordinate' },
                y1: { type: 'number', description: 'Start Y coordinate' },
                z1: { type: 'number', description: 'Start Z coordinate' },
                x2: { type: 'number', description: 'End X coordinate' },
                y2: { type: 'number', description: 'End Y coordinate' },
                z2: { type: 'number', description: 'End Z coordinate' },
              },
              required: ['x1', 'y1', 'z1', 'x2', 'y2', 'z2'],
            },
          },
        ] satisfies Tool[],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'connect_minecraft':
            if (!args) throw new Error('Missing arguments');
            return await this.minecraftAgent.connect(args as any);

          case 'disconnect_minecraft':
            return await this.minecraftAgent.disconnect();

          case 'get_bot_status':
            return await this.minecraftAgent.getStatus();

          case 'move_to_position':
            if (!args) throw new Error('Missing arguments');
            return await this.minecraftAgent.moveToPosition(
              args.x as number, 
              args.y as number, 
              args.z as number
            );

          case 'place_block':
            if (!args) throw new Error('Missing arguments');
            return await this.minecraftAgent.placeBlock(
              args.x as number, 
              args.y as number, 
              args.z as number, 
              args.blockType as string
            );

          case 'break_block':
            if (!args) throw new Error('Missing arguments');
            return await this.minecraftAgent.breakBlock(
              args.x as number, 
              args.y as number, 
              args.z as number
            );

          case 'scan_area':
            if (!args) throw new Error('Missing arguments');
            return await this.minecraftAgent.scanArea(
              args.x1 as number, 
              args.y1 as number, 
              args.z1 as number,
              args.x2 as number, 
              args.y2 as number, 
              args.z2 as number
            );

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing ${name}: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Layr Minecraft MCP Server started');
  }
}

// Start the server
const server = new LayrMCPServer();
server.start().catch(console.error); 