(function() {
    var pathDataProvide = [
        {
            "data": {
                "id": 1
            },
            "structure": {
                "object": {
                    "id": "string"
                }
            },
            "path": "id"
        },
        {
            "data": {
                "id": 1,
                "name": "Alex",
                "books": [
                    {
                        "author": "Достоевский Фёдор Михайлович",
                        "title": "Преступление и наказание",
                        "tags": ["classic"]
                    }, {
                        "author": "Steve McConnell",
                        "title": "Code Complete",
                        "tags": ["programming"]
                    }, {
                        "author": "Stoyan Stefanov",
                        "title": "JavaScript Patterns",
                        "tags": null
                    }
                ]
            },

            "structure": "User",

            "custom": {
                "User": {
                    "object": {
                        "id": "number",
                        "name": "string",
                        "books": "Books"
                    }
                },
                "Books": {
                    "array": "Book"
                },
                "Book": {
                    "object": {
                        "author": "string",
                        "title": "string",
                        "tags": "Tags"
                    }
                },
                "Tags": {
                    "array": "string"
                }
            },

            "path": "books.2.tags"
        },
        {
            "data": {
                "id": 1,
                "children": {
                    "5": {
                        "id": 5,
                        "children": {
                            "17": {
                                "id": 17,
                                "children": {
                                    "32": {
                                        "id": 32,
                                        "children": []
                                    },
                                    "53": {}
                                }
                            }
                        }
                    }
                }
            },
            "structure": "Root",
            "custom": {
                "Root": {
                    "object": {
                        "id": "number",
                        "children": "Children"
                    }
                },
                "Children": {
                    "array": "Root"
                }
            },
            "path": "children.5.children.17.children.53.id"
        }
    ];

    QUnit.test( "path", function( assert ) {

        for (var index in pathDataProvide) {
            var provider = pathDataProvide[index];

            var diff = CDS.check(provider.data, provider.structure, provider.custom);

            assert.equal(diff.isEqual(), false);
            assert.equal(diff.getPath(), provider.path);
        }

    });
})();