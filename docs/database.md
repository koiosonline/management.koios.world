
# Table of Contents

1.  [Introduction](#org3a5c1f6)
2.  [STRUCTURE](#org7543d9e)
    1.  [Authentication](#orgd12f7e2)
    2.  [Template](#orgf53f0f1)



<a id="org3a5c1f6"></a>

# Introduction

The koios education platform uses a decentralized database to store all world and course data. User data will/can be stored by using [Ceramic Streamtypes](https://developers.ceramic.network/streamtypes/overview/). Non user data for instance Worlds, Lessons and Literature will be stored on [IPFS](https://github.com/ipfs/ipfs) in a decentralized peer to peer database called [OrbitDB](https://github.com/orbitdb/orbit-db).


<a id="org7543d9e"></a>

# STRUCTURE

The current filestructure for storing non user data is based upon multiple json files. These json files hold info about all non user data. Also they refer to other json files to get a structured layered design/format. Orbitdb&rsquo;s [docstore](https://github.com/orbitdb/orbit-db-docstore) is a decentralised datastorage solution of OrbitDB which is the most similar to our current filestructure. An OrbitDB docsore stores json documents which can be indexed.


<a id="orgd12f7e2"></a>

## Authentication

Orbitdb&rsquo;s data is stored on ipfs. Which means every peer (participant) has read permissions on the data put into these database instances. Even though read-permissions aren&rsquo;t configurable, write-permissions are.
Write-permissions are determined by the [access controller](https://github.com/orbitdb/orbit-db/blob/main/GUIDE.md#custom-access-controller) object added to the orbitdb instance in the objects properties.
Since permissions can only be set and determined at db-instance level, every world should be separated in its own world-db-instance to enable multilayer permissions. Eventually, every world-db-instances should be put inside a parent db to index all worlds. Using the aforementioned structure enables to set the permission for each distinct world.


<a id="orgf53f0f1"></a>

## Template

**Top Level world-db holding all world-instances**

Template in json

    {
        course: "worldname",
        CID: "orbitCID"
    }

**One world-instance (course-instance)**
Template in json

    {
        course: "coursename",
        url: "url",
        description: "description",
        quiz: "quiz",
        quickLinks:{
                    {
                        linkTitle: "Course info",
                        linkUrl: "https://"
                    },
                    {
                        linkTitle: "Course info",
                        linkUrl: "https://"
                    }
                   },
        content:{
                    {
                        title: "Blockchain level 1",
                        videoinfo: {},
                        data: {},
                        subtitle: "Basic introduction"
                    },
                    {}
                },
        earn:{
                {
                    title: "Sidejobs",
                    linkUrl: "/link"
                },
                {}
             },
        connect:{
                    title: "Blackbirds",
                    linkUrl: "/link"
                },
                {}
        team:{
                subtitle: "When you join koios",
                p1: "This includes Field experts",
                p2: "",
                members:{
                            {
                                name: "Gerard Persoon",
                                imageUrl : "https://cdn.discordapp.com/avatars/525687122233917471/a5206ac46ce91d176a22b99ce947ef2d.png?size=256"
                                description : "Deep into the technical details of blockchains"
                                twitterLink : "https://twitter.com/gpersoon"
                                twitterHandle : "@gpersoon"
                                discordLink : "https://discord.com/users/525687122233917471"
                                discordHandle : "Gerard Persoon"
                            },
                            {}
                        }
             }
    }

