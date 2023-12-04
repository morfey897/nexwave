import { SESSION_COOKIE } from "@packages/config/dist";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //Remove the value and expire the cookie
  const reqCookies = cookies();
  reqCookies.set({
    name: SESSION_COOKIE,
    value: "",
    maxAge: -1,
  });
  return NextResponse.json({}, { status: 200 });
}