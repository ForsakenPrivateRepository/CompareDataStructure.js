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
                        "author": "Steve McConnell",
                        "title": "JavaScript Patterns",
                        "tags": null
                    },
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
                "Book": {
                    "object": {
                        "author": "string",
                        "title": "string",
                        "tags": "Tags"
                    }
                },
                "Books": {
                    "array": "Book"
                },
                "Tags": {
                    "array": "string"
                }
            },

            "path": "books.2.tags"
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