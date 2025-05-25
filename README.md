# Layr - Minecraft Building Assistant MCP Server

Layr is a Model Context Protocol (MCP) server that enables Claude Desktop to help users build structures in Minecraft. It acts as an intelligent assistant for Minecraft building, similar to how Cursor assists with code.

## Features

- **Minecraft Server Connection**: Connect to any Minecraft server
- **Bot Control**: Move, place blocks, break blocks, and scan areas
- **Building Assistance**: Get intelligent help with Minecraft construction projects
- **Real-time Status**: Monitor bot health, position, and server status

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

### Configuring Claude Desktop

Add this server to your Claude Desktop MCP configuration:

```json
{
  "mcpServers": {
    "layr-minecraft": {
      "command": "node",
      "args": ["/path/to/Layr/dist/index.js"]
    }
  }
}
```

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

## Contributing

This project is in early development. Contributions are welcome!

## License

MIT 