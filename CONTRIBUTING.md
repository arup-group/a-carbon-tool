# Speckle Contribution Guidelines
## Introduction

Thank you for reading this! Speckle's a rather wide network of parts that depend on each other, either directly, indirectly or even just cosmetically.

> Here's the gist: **Speckle** is an ecosystem consisting of a server, a contract and various clients. All manifestations of speckle that you see and interact with are, essentially, clients or composed of several clients. 

This means that what might look like a simple quick change in one repo may have a big hidden cost that propagates around other parts of the project. We're all here to help each other, and this guide is meant to help you get started and promote a framework that can untangle all these dependecies through discussion!

## Bugs & Issues 🐞

Found a new bug? 
- First step is to check whether this is a new bug! We encourage you to search through the issues of the project in question **and** associated repos!

- If you come up with nothing, open a new issue with a clear title and description, as much relevant information as possible: system configuration, code samples & steps to reproduce the problem. 

- Also, most importantly, do reference & note all potentially affected projects. 

> **Example**: https://github.com/speckleworks/SpeckleCore/issues/67
Adding a project number to `SpeckleProjects`: this is a minor change in Speckle's .NET SDK. Nevertheless, this also requires an update in the SpeckleServer's models definition and, furthermore, an update of the respective schema in Speckle Specs & a rebuild of the docs. What initially looks like a 1 line addition to a c# class suddenly becomes a proper quest by itself! 

## Patches For Bugs ⚠️
You fixed something!

- If the bug was logged previously as an issue, do reference that issue! 
- If it's a previously unreported bug, do describe it and the resolution you implmemented. 

> Make sure though that you've covered the lateral thinking needed for a bug report, as described above, also in your implementation!

## Patches For New Features 🎉
Discuss first!

- Before embarking on adding a new feature, suggest it first as an issue with the `enhancement` label and/or title - this will allow relevant people to pitch in
- Start writing code & submit a PR once you're moderately happy. 

> Many clients may potentially have overlapping scopes, some features might already be in dev somewhere else, or might have been postponed to the next major release due to api instability in that area. For example, adding a delete stream button in the accounts panel in rhino: this feature was planned for speckle admin, and the whole functionality of the accounts panel in rhino is to be greatly reduced!

## Cosmetic Patches ✨

Changes that are cosmetic in nature and do not add anything substantial to the stability or functionality of Speckle **will generally not be accepted**. 

Why? However trivial the changes might seem, there might be subtle reasons for the original code to be as it is. Furthermore, there are a lot of potential hidden costs (that even maintainers themselves are not aware of fully!) and they eat up review time unncessarily.

> **Examples**: modifying the colour of an UI element in one client may have a big hidden cost and need propagation in several other clients that implement a similar ui element. Changing the default port or specifiying `localhost` instead of `0.0.0.0` breaks cross-vm debugging and developing. 


## Wrap up
Don't worry if you get things wrong. We all do, including project owners: this document should've been here a long time ago. There's plenty of room for discussion either on the [slack group](https://slacker.speckle.works) or [the forum](https://discourse.speckle.works).

🙌❤️💙💚💜🙌

#### Appendix: Ecosystem quick overview

**The Server** is at the core of all things Speckle, but is not necessarily the primary source of truth. It also relays client messages (which, at the moment, are loosely regulated and not necessarily bound by a contract). 

**That source of truth is (should be!) the SpeckleSpecs**, the OpenApi 2 specification document that describes the REST api as well as the models (schemas) speckle operates with. This is the document that all speckle clients rely on to be able to talk with the server and each other.

**The clients** all talk to the server via the REST api and optionally to each other via WS messages (that the server relays, and their only bounding box is the `streamId` room). Example client apps include SpeckleRhino (Rhino and Grasshopper components), SpeckleAdmin and the SpeckleViewer. Speckle Rhino depends on SpeckleCore, the .NET Speckle SDK (which is also dependend upon by SpeckleDynamo and other future .net bound clients) and SpeckleView, the UI frontend. 
