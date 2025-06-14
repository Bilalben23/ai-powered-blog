"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server.ts
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_express5 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);

// src/configs/envVars.ts
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var ENV_VARS = {
  PORT: Number(process.env.PORT) || 5e3,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/quickblog",
  FRONTEND_URI: process.env.FRONTEND_URI || "http://localhost:5173",
  JWT_SECRET: process.env.JWT_SECRET || "jwt_secret",
  REFRESH_SECRET: process.env.REFRESH_SECRET || "refresh_secret",
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY || "",
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY || "",
  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT || "",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || ""
};

// src/configs/db.ts
var import_mongoose = require("mongoose");
async function connectDB() {
  try {
    await (0, import_mongoose.connect)(ENV_VARS.MONGO_URI);
    console.log("\u2705 Connected to MongoDB successfully");
  } catch (err) {
    console.error("\u274C Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

// src/configs/passport.ts
var import_passport = __toESM(require("passport"), 1);

// src/models/userModel.ts
var import_mongoose2 = require("mongoose");
var userSchema = new import_mongoose2.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is required"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  }
}, { timestamps: true });
var User = (0, import_mongoose2.model)("User", userSchema);

// src/configs/passport.ts
var import_passport_jwt = require("passport-jwt");
var opts = {
  jwtFromRequest: import_passport_jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ENV_VARS.JWT_SECRET
};
var configurePassport = () => {
  import_passport.default.use(new import_passport_jwt.Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id).select("-password").lean();
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }));
};

// src/server.ts
var import_cookie_parser = __toESM(require("cookie-parser"), 1);
var import_passport4 = __toESM(require("passport"), 1);

// src/controllers/authController.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);

// src/utils/token.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var generateAccessToken = (userId) => {
  return import_jsonwebtoken.default.sign({ id: userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: "15m"
  });
};
var generateRefreshToken = (userId) => {
  return import_jsonwebtoken.default.sign({ id: userId }, ENV_VARS.REFRESH_SECRET, {
    expiresIn: "7d"
  });
};

// src/controllers/authController.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"), 1);
var register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Email already exists"
      });
      return;
    }
    const hashedPassword = await import_bcrypt.default.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken2 = generateRefreshToken(user._id.toString());
    res.cookie("refreshToken", refreshToken2, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1e3
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      accessToken
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await (0, import_bcrypt.compare)(password, user.password)) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
      return;
    }
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken2 = generateRefreshToken(user._id.toString());
    res.cookie("refreshToken", refreshToken2, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1e3
    });
    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      accessToken
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "No refresh token provided"
    });
    return;
  }
  try {
    import_jsonwebtoken2.default.verify(token, ENV_VARS.REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "Invalid refresh token"
        });
        return;
      }
      const user = await User.findById(decoded.id).select("-password").lean();
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found"
        });
        return;
      }
      const newAccessToken = generateAccessToken(decoded.id);
      res.status(200).json({
        success: true,
        accessToken: newAccessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var logout = (req, res) => {
  const refreshToken2 = req.cookies.refreshToken;
  if (!refreshToken2) {
    res.status(400).json({
      success: false,
      message: "No active session found, user is already logged out"
    });
    return;
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: ENV_VARS.NODE_ENV === "production"
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};

// src/middlewares/validate.ts
var validate = (schema) => (req, res, next) => {
  try {
    if (schema.body) {
      const result = schema.body.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: result.error.errors.map((err) => ({
            field: err.path.join("."),
            msg: err.message
          }))
        });
        return;
      }
      req.body = result.data;
    }
    if (schema.query) {
      const result = schema.query.safeParse(req.query);
      if (!result.success) {
        res.status(400).json({
          success: false,
          errors: result.error.errors.map((err) => ({
            field: err.path.join("."),
            msg: err.message
          }))
        });
        return;
      }
      req.query = result.data;
    }
    if (schema.params) {
      const result = schema.params.safeParse(req.params);
      if (!result.success) {
        res.status(400).json({
          success: false,
          errors: result.error.errors.map((err) => ({
            field: err.path.join("."),
            msg: err.message
          }))
        });
        return;
      }
      req.params = result.data;
    }
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Validation middleware failed unexpectedly"
    });
    return;
  }
};

// src/validations/authSchema.ts
var import_zod = require("zod");
var registerSchema = import_zod.z.object({
  name: import_zod.z.string({
    required_error: "Name is required"
  }).min(3, "name must be at least 3 characters"),
  email: import_zod.z.string({
    required_error: "Email is required"
  }).email("Invalid email format"),
  password: import_zod.z.string({
    required_error: "Password is required"
  }).min(6, "Password must be at least 6 characters")
});
var loginSchema = import_zod.z.object({
  email: import_zod.z.string({
    required_error: "Email is required"
  }).email("Invalid email format"),
  password: import_zod.z.string({
    required_error: "Password is required"
  }).min(6, "Password must be at least 6 characters")
});

// src/routes/authRoutes.ts
var import_express = require("express");
var router = (0, import_express.Router)();
router.post(
  "/register",
  validate({ body: registerSchema }),
  register
);
router.post(
  "/login",
  validate({ body: loginSchema }),
  login
);
router.post(
  "/refresh-token",
  refreshToken
);
router.post(
  "/logout",
  logout
);
var authRoutes_default = router;

// src/routes/blogRoutes.ts
var import_express2 = require("express");

// src/models/blogModel.ts
var import_mongoose3 = require("mongoose");
var blogCategories = ["startup", "technology", "lifestyle", "finance"];
var blogSchema = new import_mongoose3.Schema({
  author: {
    type: import_mongoose3.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author id is required"]
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  subTitle: {
    type: String,
    required: [true, "Subtitle is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  category: {
    type: String,
    enum: blogCategories,
    required: [true, "Category is required"]
  },
  image: {
    type: String,
    required: [true, "Image is required"]
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
var Blog = (0, import_mongoose3.model)("Blog", blogSchema);

// src/configs/imagekit.ts
var import_imagekit = __toESM(require("imagekit"), 1);
var imagekit = new import_imagekit.default({
  publicKey: ENV_VARS.IMAGEKIT_PUBLIC_KEY,
  privateKey: ENV_VARS.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: ENV_VARS.IMAGEKIT_URL_ENDPOINT
});
var imagekit_default = imagekit;

// src/utils/uploadToImageKit.ts
var uploadImageAndGetOptimizedUrl = async (buffer, fileName) => {
  const uploadResponse = await imagekit_default.upload({
    file: buffer,
    fileName,
    folder: "/blogs"
  });
  return imagekit_default.url({
    path: uploadResponse.filePath,
    transformation: [
      { quality: "auto" },
      { format: "webp" },
      { width: "1280" }
    ]
  });
};

// src/models/commentModel.ts
var import_mongoose4 = require("mongoose");
var commentSchema = new import_mongoose4.Schema({
  blog: {
    type: import_mongoose4.Schema.Types.ObjectId,
    ref: "Blog",
    required: [true, "Blog id is required"]
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: 30
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
    maxlength: 1e3
  },
  isApproved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
var Comment = (0, import_mongoose4.model)("Comment", commentSchema);

// src/configs/gemini.ts
var import_genai = require("@google/genai");
var ai = new import_genai.GoogleGenAI({ apiKey: ENV_VARS.GEMINI_API_KEY });
async function generateBlogDescription(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt
  });
  return response.candidates?.[0].content || "";
}
var gemini_default = generateBlogDescription;

// src/controllers/blogController.ts
var getBlogsForAuthor = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const authorId = req.user._id;
    const totalBlogs = await Blog.countDocuments({ author: authorId });
    const totalPages = Math.ceil(totalBlogs / limit);
    const blogs = await Blog.find({ author: authorId }).select("title isPublished createdAt").sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    res.status(200).json({
      success: true,
      message: `Fetched blogs for author - page ${page} of ${totalPages}`,
      data: blogs,
      pagination: {
        currentPage: page,
        totalPages,
        pageSize: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var getDashboardStats = async (req, res) => {
  try {
    const authorId = req.user._id.toString();
    const [authorBlogIds, totalBlogs, totalDrafts] = await Promise.all([
      Blog.find({ author: authorId }).distinct("_id"),
      Blog.countDocuments({ author: authorId }),
      Blog.countDocuments({ author: authorId, isPublished: false })
    ]);
    const [totalComments, latestBlogs] = await Promise.all([
      Comment.countDocuments({ blog: { $in: authorBlogIds } }),
      Blog.find({ author: authorId }).sort({ createdAt: -1 }).limit(6).select("title createdAt isPublished").lean()
    ]);
    res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: {
        totalBlogs,
        totalComments,
        totalDrafts,
        latestBlogs
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const query = req.query.q?.trim();
    const filter = { isPublished: true };
    if (category !== "all") {
      filter.category = category;
    }
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } }
      ];
    }
    const totalBlogs = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(totalBlogs / limit);
    const blogs = await Blog.find(filter).select("title description category image").sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    res.status(200).json({
      success: true,
      message: category === "all" ? `All blogs retrieved successfully` : `Blogs in category '${category}' retrieved successfully`,
      data: blogs,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findOne({ _id: blogId, isPublished: true }).select("-isPublished -__v -updatedAt").populate("author", "name").lean();
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog not found"
      });
      return;
    }
    res.status(200).json({
      success: false,
      message: "Blog fetched successfully",
      data: blog
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var createBlog = async (req, res) => {
  try {
    const authorId = req.user._id.toString();
    const imageFile = req.file;
    if (!imageFile) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: [
          {
            field: "image",
            msg: "Image is required"
          }
        ]
      });
      return;
    }
    const optimizedImageUrl = await uploadImageAndGetOptimizedUrl(
      imageFile.buffer,
      imageFile.originalname
    );
    const blog = await Blog.create({
      author: authorId,
      image: optimizedImageUrl,
      ...req.body
    });
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: {
        _id: blog._id,
        category: blog.category
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var generateDescription = async (req, res) => {
  const { prompt } = req.body;
  try {
    const rawResponse = await gemini_default(`generate a blog content for this topic: ${prompt} in simple text format`);
    let description = "";
    if (rawResponse && typeof rawResponse === "object" && "parts" in rawResponse && Array.isArray(rawResponse.parts)) {
      description = rawResponse.parts?.[0]?.text || "";
    }
    res.status(200).json({
      success: true,
      message: "Blog description generated successfully",
      data: { description }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var togglePublish = async (req, res) => {
  try {
    const authorId = req.user._id.toString();
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog not found"
      });
      return;
    }
    if (blog.author.toString() !== authorId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog"
      });
      return;
    }
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.status(200).json({
      success: true,
      message: `Blog ${blog.isPublished ? "published" : "unpublished"} successfully`,
      data: {
        _id: blog._id,
        category: blog.category,
        isPublished: blog.isPublished
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var updateBlog = async (req, res) => {
  try {
    const authorId = req.user._id.toString();
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog not found"
      });
      return;
    }
    if (blog.author.toString() !== authorId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog"
      });
      return;
    }
    const imageFile = req.file;
    if (imageFile) {
      const optimizedImageUrl = await uploadImageAndGetOptimizedUrl(
        imageFile.buffer,
        imageFile.originalname
      );
      blog.image = optimizedImageUrl;
    }
    Object.assign(blog, req.body);
    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id.toString();
    const blog = await Blog.findById(blogId).lean();
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog not found"
      });
      return;
    }
    if (blog.author.toString() !== userId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog"
      });
      return;
    }
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    await Comment.deleteMany({ blog: blogId });
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: {
        _id: deletedBlog?._id,
        category: deletedBlog?.category
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};

// src/middlewares/authenticateJWT.ts
var import_passport2 = __toESM(require("passport"), 1);
var authenticateJWT = (req, res, next) => {
  import_passport2.default.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error when authenticating"
      });
      return;
    }
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

// src/validations/blogSchema.ts
var import_zod2 = require("zod");
var createBlogSchema = import_zod2.z.object({
  title: import_zod2.z.string({
    required_error: "Title is required"
  }).min(3, "Title must be at least 3 characters"),
  subTitle: import_zod2.z.string({
    required_error: "SubTitle is required"
  }).min(3, "SubTitle must be at least 3 characters"),
  description: import_zod2.z.string({
    required_error: "Description is required"
  }).min(10, "Description must be at least 10 characters"),
  category: import_zod2.z.enum(blogCategories, {
    required_error: "Category is required",
    message: `Category must be one of these: ${blogCategories.join(" | ")}`
  }),
  isPublished: import_zod2.z.union([
    import_zod2.z.boolean(),
    import_zod2.z.literal("true").transform(() => true),
    import_zod2.z.literal("false").transform(() => false)
  ]).catch(false).default(false)
});
var generateDescriptionSchema = import_zod2.z.object({
  prompt: import_zod2.z.string({ required_error: "Prompt text is required" }).trim().min(10, "Prompt must be at least 10 characters")
});
var updateBlogSchema = createBlogSchema.partial();

// src/middlewares/multer.ts
var import_multer = __toESM(require("multer"), 1);
var storage = import_multer.default.memoryStorage();
var upload = (0, import_multer.default)({ storage });

// src/routes/blogRoutes.ts
var router2 = (0, import_express2.Router)();
router2.get(
  "/author",
  authenticateJWT,
  getBlogsForAuthor
);
router2.get(
  "/dashboard",
  authenticateJWT,
  getDashboardStats
);
router2.get(
  "/category/:category",
  getBlogsByCategory
);
router2.get(
  "/:id",
  getBlogById
);
router2.post(
  "/",
  authenticateJWT,
  upload.single("image"),
  validate({ body: createBlogSchema }),
  createBlog
);
router2.post(
  "/generate-description",
  authenticateJWT,
  validate({ body: generateDescriptionSchema }),
  generateDescription
);
router2.patch(
  "/:id/publish",
  authenticateJWT,
  togglePublish
);
router2.patch(
  "/:id",
  authenticateJWT,
  upload.single("image"),
  validate({ body: updateBlogSchema }),
  updateBlog
);
router2.delete(
  "/:id",
  authenticateJWT,
  deleteBlog
);
var blogRoutes_default = router2;

// src/controllers/commentController.ts
var import_mongoose5 = require("mongoose");
var getAllComments = async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const userId = req.user._id.toString();
  const isApproved = req.query.isApproved === "true";
  try {
    const matchStage = {
      ...typeof req.query.isApproved === "string" ? { isApproved } : { isApproved: true }
    };
    const comments = await Comment.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "blogs",
          localField: "blog",
          foreignField: "_id",
          as: "blog"
        }
      },
      { $unwind: "$blog" },
      { $match: { "blog.author": new import_mongoose5.Types.ObjectId(userId) } },
      {
        $project: {
          content: 1,
          name: 1,
          isApproved: 1,
          createdAt: 1,
          blog: { _id: 1, title: 1 }
        }
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]);
    const total = await Comment.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "blogs",
          localField: "blog",
          foreignField: "_id",
          as: "blog"
        }
      },
      { $unwind: "$blog" },
      { $match: { "blog.author": new import_mongoose5.Types.ObjectId(userId) } },
      { $count: "total" }
    ]);
    const totalCount = total[0]?.total || 0;
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: comments,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var getApprovedCommentsForBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blogExists = await Blog.exists({ _id: blogId });
    if (!blogExists) {
      res.status(404).json({
        success: false,
        message: "Blog not found"
      });
      return;
    }
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true
    }).select("-__v -blog -isApproved").sort({ createdAt: -1 }).lean();
    res.status(200).json({
      success: true,
      message: `${comments.length} approved comment(s) found`,
      data: comments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var createComment = async (req, res) => {
  const { blogId } = req.params;
  const { name, content } = req.body;
  try {
    const blogExists = await Blog.exists({ _id: blogId });
    if (!blogExists) {
      res.status(404).json({
        success: false,
        message: "Blog not found"
      });
      return;
    }
    const comment = await Comment.create({
      blog: blogId,
      name,
      content
    });
    res.status(201).json({
      success: true,
      message: "Comment created successfully and pending approval"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var approveComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user._id.toString();
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({
        success: false,
        message: "Comment not found"
      });
      return;
    }
    const blog = await Blog.findById(comment.blog);
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog associated with this comment not found"
      });
      return;
    }
    if (blog.author.toString() !== userId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to approve comments on this blog"
      });
      return;
    }
    comment.isApproved = true;
    await comment.save();
    res.status(200).json({
      success: true,
      message: "Comment approved successfully",
      data: {
        commentId: comment._id,
        blogId: blog._id
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user._id.toString();
  try {
    const comment = await Comment.findById(commentId).populate("blog", "author");
    if (!comment) {
      res.status(404).json({
        success: false,
        message: "Comment not found"
      });
      return;
    }
    if (comment.blog.author.toString() !== userId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment"
      });
      return;
    }
    await Comment.deleteOne({ _id: commentId });
    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      data: {
        _id: comment._id,
        blogId: comment.blog._id,
        isApproved: comment.isApproved
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};

// src/validations/commentSchema.ts
var import_zod3 = require("zod");
var createCommentSchema = import_zod3.z.object({
  name: import_zod3.z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }).min(3, "Name must be at least 3 characters").max(30, "Name must be at most 30 characters"),
  content: import_zod3.z.string({
    required_error: "Content is required",
    invalid_type_error: "Content must be a string"
  }).min(3, "Content must be at least 3 characters").max(1e3, "Content must be at most 100 characters")
});

// src/routes/commentRoutes.ts
var import_express3 = require("express");
var router3 = (0, import_express3.Router)();
router3.get(
  "/",
  authenticateJWT,
  getAllComments
);
router3.get(
  "/blog/:blogId",
  getApprovedCommentsForBlog
);
router3.post(
  "/:blogId",
  validate({ body: createCommentSchema }),
  createComment
);
router3.patch(
  "/:id/approve",
  authenticateJWT,
  approveComment
);
router3.delete(
  "/:id",
  authenticateJWT,
  deleteComment
);
var commentRoutes_default = router3;

// src/routes/newsletterRoutes.ts
var import_express4 = require("express");

// src/models/NewsletterSubscriberModel.ts
var import_mongoose6 = require("mongoose");
var newsletterSubscriberSchema = new import_mongoose6.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });
var NewsletterSubscriber = (0, import_mongoose6.model)("NewsletterSubscriber", newsletterSubscriberSchema);

// src/controllers/newsletterController.ts
var subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;
  try {
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      res.status(400).json({
        success: false,
        message: "Email is already subscribed."
      });
      return;
    }
    const subscriber = new NewsletterSubscriber({ email });
    await subscriber.save();
    res.status(201).json({
      success: true,
      message: "Successfully subscribed to the newsletter."
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};
var getSubscribers = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const [total, subscribers] = await Promise.all([
      NewsletterSubscriber.countDocuments(),
      NewsletterSubscriber.find().select("email subscribedAt").sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
    ]);
    const totalPages = Math.ceil(total / limit);
    res.status(200).json({
      success: true,
      message: "Subscribers fetched successfully.",
      data: subscribers,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Something went wrong"
    });
  }
};

// src/validations/newsletterSchema.ts
var import_zod4 = require("zod");
var subscribeSchema = import_zod4.z.object({
  email: import_zod4.z.string({
    required_error: "Email is required"
  }).email("Invalid email format")
});

// src/routes/newsletterRoutes.ts
var router4 = (0, import_express4.Router)();
router4.post(
  "/subscribe",
  validate({ body: subscribeSchema }),
  subscribeToNewsletter
);
router4.get(
  "/subscribers",
  authenticateJWT,
  getSubscribers
);
var newsletterRoutes_default = router4;

// src/server.ts
var app = (0, import_express5.default)();
configurePassport();
app.use(import_express5.default.json());
app.use(import_express5.default.urlencoded({ extended: true }));
app.use((0, import_cookie_parser.default)());
app.use((0, import_cors.default)({
  origin: [ENV_VARS.FRONTEND_URI],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(import_passport4.default.initialize());
connectDB();
app.use("/api/v1/auth", authRoutes_default);
app.use("/api/v1/blogs", blogRoutes_default);
app.use("/api/v1/comments", commentRoutes_default);
app.use("/api/v1/newsletter", newsletterRoutes_default);
var server_default = app;
//# sourceMappingURL=server.cjs.map