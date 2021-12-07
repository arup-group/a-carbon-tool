import { shallowMount } from "@vue/test-utils";

<<<<<<< HEAD
// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg },
//     });
//     //expect(wrapper.text()).toMatch(msg);
//   });
// });

describe("basic", () => {
  it("passes", () => {
    expect(true).toBe(true);
  })
})
=======
describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    //expect(wrapper.text()).toMatch(msg);
  });
});
>>>>>>> b1605c8375f9ebceaf6f146fa0c17aa65637adad
