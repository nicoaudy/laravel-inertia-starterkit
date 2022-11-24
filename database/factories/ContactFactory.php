<?php

namespace Database\Factories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Contact::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'email' => $this->faker->companyEmail,
            'phone' => $this->faker->tollFreePhoneNumber,
            'address' => $this->faker->streetAddress,
            'city' => $this->faker->city,
            'region' => $this->faker->state,
            'country' => 'US',
            'postal_code' => $this->faker->postcode,
        ];
    }
}
