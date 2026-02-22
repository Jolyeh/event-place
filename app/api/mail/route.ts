import { sendMail } from "@/src/utils/mail";
import { NextResponse } from "next/server";

export async function POST() {

  await sendMail({

    to: "joelprinceyeheze@gmail.com",

    subject: "Test",

    text: "Email fonctionne",

  });

  return NextResponse.json({

    success: true,

  });

}