import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.lesson.createMany({
    data: [
      {
        level_id: '145a5087-32ac-43fc-8c0c-a29b39ac90df',
        order: 1,
      },
      {
        level_id: '145a5087-32ac-43fc-8c0c-a29b39ac90df',
        order: 2,
      },
      {
        level_id: '145a5087-32ac-43fc-8c0c-a29b39ac90df',
        order: 3,
      },
      {
        level_id: '145a5087-32ac-43fc-8c0c-a29b39ac90df',
        order: 4,
      },
      {
        level_id: '145a5087-32ac-43fc-8c0c-a29b39ac90df',
        order: 5,
      },
      {
        level_id: '145a5087-32ac-43fc-8c0c-a29b39ac90df',
        order: 6,
      },
      {
        level_id: '145a5087-32ac-43fc-8c0c-a29b39ac90df',
        order: 7,
      },
      {
        level_id: 'e27b0571-d26f-4eb4-8724-cba5062b40a8',
        order: 1,
      },
      {
        level_id: '15df2811-c91e-4a72-9316-7a73604d9575',
        order: 1,
      },
      {
        level_id: 'de24f235-b28a-47de-9026-4f4dccc77554',
        order: 1,
      },
      {
        level_id: '306bac07-1f23-4c46-b8a8-71462b82300c',
        order: 1,
      },
      {
        level_id: '1cf4340e-c3c7-479a-a18d-9f5fc796fb43',
        order: 1,
      },
      {
        level_id: '4d4b5066-363e-472d-87dd-881abb26dbf7',
        order: 1,
      },
      {
        level_id: 'd59f3edb-d49b-43b1-9465-4b9248673fe3',
        order: 1,
      },
      {
        level_id: 'b2d59c71-71c8-4db7-879b-de52ab644d9d',
        order: 1,
      },
      {
        level_id: 'df509377-4539-411a-961f-fcd044e44456',
        order: 1,
      },
      {
        level_id: '8813f26f-8a64-4b58-afb3-0f68428380f0',
        order: 1,
      },
      {
        level_id: '3ca83048-1eb2-4de0-ae87-2b3785ef3d5d',
        order: 1,
      },
      {
        level_id: '9516285e-336a-445c-b100-be1925c4f5e0',
        order: 1,
      },
      {
        level_id: '21cea364-6764-44cd-9515-8b0eec13bd03',
        order: 1,
      },
      {
        level_id: '2fc6c9c1-5a0b-4fd5-8f41-590c35b8ae62',
        order: 1,
      },
      {
        level_id: '3e70a0f4-63b6-4c34-b590-5cd43655b7e9',
        order: 1,
      },
      {
        level_id: '6ab3a886-3b6c-42d3-9de4-c8a09ec9f7be',
        order: 1,
      },
      {
        level_id: 'c13c51d6-cc9f-4ae6-b7cc-ee3e2fe5a550',
        order: 1,
      },
      {
        level_id: 'c54522b3-ba84-43b2-91ca-eabc7424866d',
        order: 1,
      },
      {
        level_id: '8d932e12-8156-47a6-bb95-161460f688c0',
        order: 1,
      },
      {
        level_id: '801f746c-62be-45fb-ad29-cd5b44e79855',
        order: 1,
      },
      {
        level_id: 'fdf91230-9fa1-4ab2-94fd-86a9f80bd83b',
        order: 1,
      },
      {
        level_id: '902f6559-111a-4cec-9351-1f8465052710',
        order: 1,
      },
      {
        level_id: 'eb0a94eb-078f-428c-be45-f54ec1b65069',
        order: 1,
      },
      {
        level_id: '58740ce1-cf8c-4a3d-b1b1-151daef71f77',
        order: 1,
      },
      {
        level_id: '46527b67-c73e-4a40-8a29-8ffa20f697b3',
        order: 1,
      },
      {
        level_id: '3b4cea9b-6fd0-4eb7-ab56-621f3cbd563c',
        order: 1,
      },
      {
        level_id: 'd3ead07d-7876-44ac-af49-9c18da812849',
        order: 1,
      },
      {
        level_id: 'f7e1f23b-fba9-4864-b7ea-721df4621548',
        order: 1,
      },
      {
        level_id: '335907d5-e42f-440f-a2e9-ce51434e8a4d',
        order: 1,
      },
      {
        level_id: '5e45ab3c-4168-4bb5-ac38-97bb46de2575',
        order: 1,
      },
      {
        level_id: '2425d46d-f22d-4774-a218-2e9dbd91f94d',
        order: 1,
      },
      {
        level_id: '86149b45-6629-4ba6-bdd7-afb47adb328e',
        order: 1,
      },
      {
        level_id: 'a8adf7cf-1a85-4462-a8a6-db23ae67b508',
        order: 1,
      },
      {
        level_id: '5e941a78-b312-4577-a997-222ce3d3bd4b',
        order: 1,
      },
      {
        level_id: '0da1b65d-4ef5-4f01-aa4e-58f6722132cc',
        order: 1,
      },
      {
        level_id: '6ad643eb-1823-47ac-9cde-a3885a72b329',
        order: 1,
      },
      {
        level_id: '06dd37f8-efb0-4b99-9195-c48a07566abb',
        order: 1,
      },
      {
        level_id: 'c897c3b4-d0b2-4090-935e-8dcaf9b369e2',
        order: 1,
      },
      {
        level_id: 'bdaf96bb-56fb-4994-961b-98e31d34b30c',
        order: 1,
      },
      {
        level_id: '44d86531-86f6-4454-a75f-aa2b3983509a',
        order: 1,
      },
      {
        level_id: '0d19a04b-b175-4ca6-8b54-1bd6ef32470a',
        order: 1,
      },
      {
        level_id: '2a6b9984-1af8-4ad2-9ae2-1b1507108fb9',
        order: 1,
      },
      {
        level_id: '31d0a290-62ca-4995-838b-57492d035623',
        order: 1,
      },
      {
        level_id: 'dce9b687-2d32-4ba0-8dff-9855615443cb',
        order: 1,
      },
      {
        level_id: 'c8fd5b53-270f-4851-a33f-e87766d139dc',
        order: 1,
      },
      {
        level_id: '238eed15-ec38-42c9-83c3-ae7e3b3fa5ef',
        order: 1,
      },
      {
        level_id: '19de7bfb-c945-497f-aa10-be28d644b6b0',
        order: 1,
      },
      {
        level_id: '365f14e7-b043-4472-8b13-eedde0a6d01b',
        order: 1,
      },
      {
        level_id: '6fb83e99-fa49-4f25-bec2-abf263e3ed90',
        order: 1,
      },
      {
        level_id: '5850f6ef-2d2f-4c3a-bb59-6c1ebe9860b1',
        order: 1,
      },
      {
        level_id: '6d5303c2-19c9-407d-aab4-599c5deeb938',
        order: 1,
      },
      {
        level_id: 'baab6771-3a37-481c-86f4-4e4011ce78c8',
        order: 1,
      },
      {
        level_id: '72b7249d-8e94-45c4-8008-a09bc6822d57',
        order: 1,
      },
      {
        level_id: '9255d3df-e907-467a-b74c-ca0a63c9b727',
        order: 1,
      },
      {
        level_id: 'bbd47714-e8c6-454f-939b-d1ccd2dcb3b7',
        order: 1,
      },
      {
        level_id: '89fce68e-93c2-4c92-a48a-e851c8ff02cc',
        order: 1,
      },
      {
        level_id: 'c6125cca-c92d-4412-a7b1-61d58182aeae',
        order: 1,
      },
      {
        level_id: '1fabdf40-3abb-4287-a1a9-e18f93ff23a9',
        order: 1,
      },
      {
        level_id: '35f26ae9-428d-46ea-96c4-e7030f76dd19',
        order: 1,
      },
      {
        level_id: '4f9db0dd-23cd-4915-986c-2b9a1f86b4dc',
        order: 1,
      },
      {
        level_id: 'ba363517-95da-42f7-881c-0e0d7ebb7d5a',
        order: 1,
      },
      {
        level_id: 'e686046b-aeb5-4f7a-9a6f-a83aa4a87b16',
        order: 1,
      },
      {
        level_id: '73cf1bc2-e8e6-4557-bc8b-3ace43a17e02',
        order: 1,
      },
      {
        level_id: 'c59b71b2-3b53-4ec9-921c-4ed33af3b272',
        order: 1,
      },
      {
        level_id: 'c39495a1-2ede-4c08-a2e6-e62c650afd9c',
        order: 1,
      },
      {
        level_id: '50f94899-a965-4846-875b-49977a360327',
        order: 1,
      },
      {
        level_id: '192c3232-d9e2-4ee2-98f1-8711c2978f02',
        order: 1,
      },
      {
        level_id: 'd0e5b1f1-9e9f-41a7-8161-ab935d9205aa',
        order: 1,
      },
      {
        level_id: '303038b2-af17-446a-b207-f1600d97dc1e',
        order: 1,
      },
      {
        level_id: 'ce7fee1f-2440-42b6-b91a-0f8937f4cf39',
        order: 1,
      },
      {
        level_id: '344e97f9-8d4b-4bdd-8d2a-a493c8863d94',
        order: 1,
      },
      {
        level_id: '31fc608e-b02a-48be-b53c-10755ea7ad5b',
        order: 1,
      },
      {
        level_id: '3fbfb4e4-71ad-48f4-b2b7-d2b871aa7a3b',
        order: 1,
      },
      {
        level_id: 'd3f0b9d6-6b88-4cb1-923d-8e76a24190e1',
        order: 1,
      },
      {
        level_id: '2087141d-8678-4413-9bca-037d333ecc4b',
        order: 1,
      },
      {
        level_id: '8ebf6cb9-7a11-4fdd-8982-b6a5a10660de',
        order: 1,
      },
      {
        level_id: 'c0c95c11-a209-4100-b6b0-43db36c2897b',
        order: 1,
      },
      {
        level_id: '630fd3f6-501f-4f24-9035-142475182698',
        order: 1,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
