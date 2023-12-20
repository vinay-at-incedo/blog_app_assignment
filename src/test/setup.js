import "@testing-library/jest-dom";
import { vi } from "vitest";

const mockFn = vi.fn().mockImplementation(() => { });

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query) => {
        return {
            matches: false,
            media: query,
            onchange: null,
            addListener: mockFn, // deprecated
            removeListener: mockFn, // deprecated
            addEventListener: mockFn,
            removeEventListener: mockFn,
            dispatchEvent: mockFn,
        };
    },
});


vi.mock("../services/BlogService", () => {
    const actual = vi.importActual("../services/BlogService");
    return {
        ...actual,
        getAuthorsService: vi
            .fn()
            .mockResolvedValue({ data: [{ id: 1, name: "Author 1" }] }),
        getCategoriesService: vi
            .fn()
            .mockResolvedValue({ data: [{ id: 1, name: "Category 1" }] }),
        getTagsService: vi
            .fn()
            .mockResolvedValue({ data: [{ id: 1, name: "Tag 1" }] }),
        createBlogService: vi
            .fn()
            .mockResolvedValue({ data: [{ id: 1, name: "Author 1" }] }),
        deleteBlogService: vi
            .fn()
            .mockResolvedValue({ data: [{ id: 1, name: "Category 1" }] }),
        getAllBlogsService: vi
            .fn()
            .mockResolvedValue({
                data: [{
                    "date": "2023-12-13T11:27:20.335Z",
                    "title": "Test",
                    "author": "Alice",
                    "category": "Medical",
                    "tags": [
                        "edtech",
                        "engineering"
                    ],
                    "comments_count": 0,
                    "id": "xlqG4Ix"
                }]
            }),
    };
});