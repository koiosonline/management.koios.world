
# Table of Contents

1.  [Introduction](#org55d00bf)
2.  [STRUCTURE](#org7f20640)
    1.  [Authentication](#org9097d23)
    2.  [Template](#org60c2257)



<a id="org55d00bf"></a>

# Introduction

The koios education platform uses a decentralized database to store all course data. User data will be stored by using [Ceramic Streamtypes](https://developers.ceramic.network/streamtypes/overview/). Non user data for instance Worlds, Lessons and Literature will be stored on ipfs in a decentralized peer to peer database called [OrbitDB](https://github.com/orbitdb/orbit-db).


<a id="org7f20640"></a>

# STRUCTURE

The current filestructure is based upon json objects. Orbitdb&rsquo;s docstore is an easy to use database type because it stores json documents which can be indexed. This looks a lot like our previous filestructure.


<a id="org9097d23"></a>

## Authentication

Orbitdb&rsquo;s data is stored on ipfs. This means everyone has read permissions on the data put into these types of databases. Write permissions are determined by the [access controller](https://github.com/orbitdb/orbit-db/blob/main/GUIDE.md#custom-access-controller) object added to the orbitdb instance in the objects properties.
Since permissions can only be set and determined by db instance, every world should be separated in its own world-db-instance. These world-db-instances can be put inside a parent db holding all worlds. Using this structure enables to set the permission for each distinct world.


<a id="org60c2257"></a>

## Template

