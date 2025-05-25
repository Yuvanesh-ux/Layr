# Layr - Minecraft Building Assistant MCP Server

Layr is a Model Context Protocol (MCP) server that enables Claude Desktop to help users build structures in Minecraft. It acts as an intelligent assistant for Minecraft building, similar to how Cursor assists with code.

## Features

- **Minecraft Server Connection**: Connect to any Minecraft server
- **Bot Control**: Move, place blocks, break blocks, and scan areas
- **Building Assistance**: Get intelligent help with Minecraft construction projects
- **Real-time Status**: Monitor bot health, position, and server status

## Quick Setup for Claude Desktop

### Simple GitHub Setup (Recommended)

Add this to your Claude Desktop MCP configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "layr-minecraft": {
      "command": "npx",
      "args": [
        "-y",
        "github:Yuvanesh-ux/Layr"
      ]
    }
  }
}
```

That's it! Claude Desktop will automatically download, build, and run the server from GitHub.

### With Connection Parameters

You can also pass default connection parameters:

```json
{
  "mcpServers": {
    "layr-minecraft": {
      "command": "npx",
      "args": [
        "-y",
        "github:Yuvanesh-ux/Layr",
        "--host",
        "localhost",
        "--port",
        "25565",
        "--username",
        "ClaudeBot"
      ]
    }
  }
}
```

### Local Development Setup

For local development:

1. Clone this repository:
```bash
git clone https://github.com/Yuvanesh-ux/Layr.git
cd Layr
```

2. Install dependencies and build:
```bash
npm install
npm run build
```

3. Use local configuration:
```json
{
  "mcpServers": {
    "layr-minecraft": {
      "command": "node",
      "args": ["/absolute/path/to/Layr/dist/index.js"]
    }
  }
}
```

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd Layr
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Development

For development with hot reloading:
```bash
npm run dev
```

To watch for changes:
```bash
npm run watch
```

## Usage

### Running the MCP Server

Start the server:
```bash
npm start
```

### Available Tools

The MCP server provides the following tools:

- **connect_minecraft**: Connect to a Minecraft server
- **disconnect_minecraft**: Disconnect from the current server
- **get_bot_status**: Get current bot status and position
- **move_to_position**: Move the bot to specific coordinates
- **place_block**: Place a block at specified coordinates
- **break_block**: Break a block at specified coordinates
- **scan_area**: Scan an area and return block information

### Using with Claude Desktop

Once configured, you can use these commands in Claude Desktop:

1. **Connect to Minecraft**: "Connect to my local Minecraft server with username 'Builder'"
2. **Check status**: "What's the current status of the Minecraft bot?"
3. **Build something**: "Place a stone block at coordinates 10, 64, 10"
4. **Move around**: "Move the bot to coordinates 0, 70, 0"
5. **Scan areas**: "Scan the area from 0,60,0 to 10,70,10"

## Configuration

The server accepts the following connection parameters:

- `host`: Minecraft server host (default: localhost)
- `port`: Minecraft server port (default: 25565)
- `username`: Bot username (required)
- `version`: Minecraft version (default: 1.20.4)

## Architecture

The project is structured as follows:

- `src/index.ts`: Main MCP server implementation
- `src/minecraft/agent.ts`: Minecraft bot agent using mineflayer
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration

## Dependencies

- **@modelcontextprotocol/sdk**: MCP SDK for building the server
- **mineflayer**: Minecraft bot framework
- **zod**: Schema validation
- **TypeScript**: Type safety and development

## Development Status

This is currently a skeleton implementation with placeholder functionality. The following features are planned:

- [ ] Advanced pathfinding and movement
- [ ] Intelligent block placement algorithms
- [ ] Structure scanning and analysis
- [ ] Building pattern recognition
- [ ] Multi-step construction planning
- [ ] Inventory management
- [ ] Error handling and recovery

## Troubleshooting

### Claude Desktop Not Finding the Server

1. Ensure you have Node.js installed
2. Check your internet connection (for GitHub setup)
3. Restart Claude Desktop after configuration changes
4. Verify the configuration file syntax is correct

### Connection Issues

1. Make sure your Minecraft server is running
2. Check firewall settings
3. Verify the server version matches your Minecraft version
4. Ensure the bot username isn't already taken

## Contributing

This project is in early development. Contributions are welcome!

## License

MIT 