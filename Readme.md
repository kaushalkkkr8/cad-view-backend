🧱 CAD File Block Viewer API
A backend API built with Node.js, Express, PostgreSQL, and Sequelize that enables users to upload .dwg or .dxf CAD files, convert .dwg to .dxf, extract block/entity data using dxf-parser, and store them in a PostgreSQL database for further querying.

📦 Features
Upload .dwg or .dxf CAD files

Automatically convert .dwg files to .dxf using ODAFileConverter

Parse DXF files to extract block/entity metadata using dxf-parser

Store file and block data in PostgreSQL

Query and filter blocks by name, type, and file

Support for paginated results

🧰 Tech Stack
Node.js, Express

PostgreSQL, Sequelize

Multer for file uploads

ODAFileConverter for .dwg → .dxf conversion

dxf-parser for DXF file parsing

CORS, dotenv

🚀 API Endpoints
📁 File Uploads
Method	Endpoint	Description
POST	/files/upload	Upload a .dwg or .dxf file
GET	/files	Get metadata of all uploaded files
🔍 Block Data
Method	Endpoint	Description
GET	/blocks/allBlocks/:fileId	Get blocks for a specific file ID (paginated)
GET	/blocks/allBlocksData	Get all blocks (paginated, with filters)
GET	/blocks/:id	Get a single block by its ID


🏗️ Project Structure

├── app.js
├── server.js
├── db.js
├── models/
│   ├── block.js
│   ├── fileInfo.js
│   └── index.js
├── routes/
│   ├── fileRoutes.js
│   └── blockRoutes.js
├── controllers/
│   └── blockController.js
├── middleware/
│   └── upload.js
├── utils/
│   ├── convertDwgToDxf.js
│   └── dxfParser.js
└── uploads/

⚙️ Setup & Installation

# 1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# 2. Install dependencies
npm install

# 3. Create a .env file and configure:
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
PORT=5000


🛠️ Utility Modules
1.**DWG to DXF conversion**

utils/convertDwgToDxf.js handles .dwg to .dxf conversion using a CLI tool (make sure to install that dependency/tool).
ODA File Converter installed on your system

Download: https://www.opendesign.com/guestfiles/oda_file_converter

Ensure the installation path is correct in your code (default path used in the script:
C:\Program Files\ODA\ODAFileConverter 25.12.0\ODAFileConverter.exe)

🚀 Features
Converts .dwg files to .dxf using ODAFileConverter

Outputs to a specified directory

Wraps conversion logic in a Promise

Customizable for batch conversion (currently converts all .dwg files in input directory)

📁 Usage
Import the module into your Node.js application.

Call the function with:

inputPath: Full path to the .dwg file

outputDir: Directory where the converted .dxf should be saved

2.**DXF Parser**

utils/dxfParser.js parses .dxf files and extracts block info

**Make sure the ODA converter's .exe path matches your local installation.**
**This module currently supports Windows only.**
**It processes all .dwg files in the input directory**


🗃️ Database Schema
📁 FileInfos Model
Represents uploaded CAD files.

Field	Type	Description
filename	STRING	Name of the uploaded file
uploadDate	DATE	Timestamp (default: NOW)
🧱 Blocks Model
Represents blocks extracted from CAD files.

Field	Type	Description
fileId	INTEGER	FK → FileInfos (the file this block belongs to)
name, type, layer, handle, text	STRING	Metadata of the block
x, y, z	FLOAT	Base coordinates of the block
xPoint1, yPoint1, zPoint1	FLOAT	Bounding or reference point 1
xPoint2, yPoint2, zPoint2	FLOAT	Bounding or reference point 2
angle	FLOAT	Rotation angle of the block
🔗 Relationships
Blocks.belongsTo(FileInfos)

Cascade Delete: When a file is deleted, its blocks are automatically deleted.

📚 Why These Libraries?
Library	Reason
express	Lightweight server framework with excellent routing/middleware support
multer	Efficient handling of file uploads
cors	Enables cross-origin requests during development
dotenv	Loads env variables securely
pg	PostgreSQL driver
sequelize	ORM for simplified DB queries and migrations
dxf-parser	Parses .dxf files into usable JSON format
🧪 Dev & Testing Tools
jest – Unit and integration testing

supertest – HTTP assertions for Express endpoints

cross-env – Platform-independent environment variable handling

🧠 Background & Learnings
While building a CAD-based app, I faced a major limitation:

DWG files are proprietary and not natively supported in Node.js environments.

🚧 Challenge
.dwg files require specialized software.

Most Node.js libraries don’t support .dwg directly.

✅ Solution
Used ODA File Converter, a Windows tool, to convert .dwg to .dxf.

Built a Node.js wrapper to automate the conversion.

🤖 AI Tools in Action
ChatGPT / Copilot helped:

Discover and validate ODAFileConverter

Write robust CLI execution logic

Handle Windows paths and async execution

Debug errors and improve CLI commands


