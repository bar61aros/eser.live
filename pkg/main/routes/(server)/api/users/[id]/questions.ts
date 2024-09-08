// Copyright 2023-present Eser Ozvataf and other contributors. All rights reserved. Apache-2.0 license.
import { type Handlers } from "$fresh/server.ts";
import { getCursor } from "@/pkg/main/library/data/cursors.ts";
import { type State } from "@/pkg/main/plugins/session.ts";
import { userRepository } from "@/pkg/main/data/user/repository.ts";
import { questionRepository } from "@/pkg/main/data/question/repository.ts";

const PAGE_SIZE = 10;

export const handler: Handlers<undefined, State> = {
  async GET(req, ctx) {
    const cursor = getCursor(req.url, PAGE_SIZE);
    const user = await userRepository.findById(ctx.params.id);

    if (user === null) {
      throw new Deno.errors.NotFound("User not found");
    }

    const result = await questionRepository.findAllByUserIdWithScores(
      cursor,
      user.id,
      ctx.state.sessionUser?.id ?? null,
    );

    return Response.json(result);
  },
};
