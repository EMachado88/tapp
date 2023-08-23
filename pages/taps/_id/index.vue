<template>
  <v-container>
    <Header icon="mdi-map-marker" text="Tap" />

    <section class="mt-10">
      <GMap
        v-if="tap.position.lat !== 0 && tap.position.lng !== 0"
        ref="map"
        class="map"
        language="en"
        :center="tap.position"
        :zoom="18"
        :options="{
          mapTypeControl: false,
          zoomControl: false,
          disableDefaultUI: true,
          draggable: false
        }"
      >
        <GMapMarker :key="tap._id" :position="tap.position" :options="{ icon: `${assetsPath}/images/drop.png` }" />
      </GMap>

      <div class="d-flex justify-space-between align-center mt-5">
        <div class="mr-2">
          <p class="text-caption">
            {{ tap.position.lat }},{{ tap.position.lng }}
          </p>

          <h6 class="text-h6">
            Rating
          </h6>

          <h6 class="text-h6">
            Address
          </h6>
          <p class="text-body-2">
            {{ tap.address }}
          </p>
        </div>

        <div class="ml-2 mb-2 d-flex flex-wrap justify-end">
          <v-btn class="blue lighten-1 mb-2" @click="getDirections">
            <span>Directions</span>
          </v-btn>
          <v-btn v-if="user.isAdmin" :to="`/taps/${tap._id}/edit`" class="ml-2">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </div>
    </section>

    <v-divider class="my-5" />

    <h6 class="text-h6">
      Reviews
    </h6>
    <div v-if="canReview || editingReview" class="add-review mt-3 mb-5">
      <v-card>
        <v-card-title>
          Your review
        </v-card-title>
        <v-card-text>
          <v-form ref="reviewForm" v-model="reviewValid" lazy-validation @submit.prevent="editingReview ? updateReview() : submitReview()">
            <div class="review-rating">
              <span v-for="(star, index) in Array(5)" :key="index" class="star">
                <v-icon class="mr-1" :class="star <= userReview.rating ? 'yellow--text' : ''" size="32" @click="setRating(index + 1)">
                  {{ index + 1 <= userReview.rating ? 'mdi-star' : 'mdi-star-outline' }}
                </v-icon>
              </span>
            </div>
            <v-textarea v-model="userReview.comment" label="Comment" class="mt-2" />

            <v-btn type="submit" color="primary">
              Submit
            </v-btn>
            <v-btn class="ml-2" @click="editingReview = false">
              Cancel
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
    <p v-if="!tap.reviews?.length" class="text-body-2">
      No reviews yet
    </p>
    <div v-else>
      <v-card v-for="review in tap.reviews" :key="review._id" class="mb-5">
        <v-card-text>
          <div class="d-flex justify-space-between">
            <p class="font-weight-bold mr-5 my-0">
              {{ review.user?.firstName }} {{ review.user?.lastName }}
            </p>

            <p class="text-caption my-0">
              {{ $moment(review.createdAt).format('D/MM/YYYY, hh:mm') }}
            </p>
          </div>

          <div>
            <v-icon v-for="star in Array(tap.rating)" :key="star">
              mdi-star
            </v-icon>
          </div>

          <div class="d-flex align-bottom justify-space-between">
            <p v-if="review.comment" class="text-body-2 mb-0 mt-2">
              {{ review.comment }}
            </p>

            <v-spacer />

            <v-btn v-if="review.user?._id === user._id && !editingReview" class="warning" @click="editReview(review)">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TapPage',
  data() {
    return {
      reviewValid: false,
      userReview: {
        _id: null,
        rating: 5,
        comment: ''
      },
      editingReview: false
    }
  },
  computed: {
    tap() {
      return this.$store.getters['taps/getTapById'](this.$route.params.id) ?? { position: { lat: 0, lng: 0 } }
    },
    user() {
      return this.$store.getters['auth/getUser']
    },
    assetsPath() {
      return process.env.NODE_ENV === 'production' ? '/tapp' : ''
    },
    canReview(): any {
      return !this.tap.reviews?.filter((review: any) => review.user?._id === this.user._id).length
    }
  },
  methods: {
    getDirections() {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${this.tap.position.lat},${this.tap.position.lng}&travelmode=walking`)
    },
    async submitReview() {
      const { comment, rating } = this.userReview

      try {
        await this.$axios.$post('/reviews', {
          comment,
          rating,
          tap: this.tap._id,
          user: this.user._id
        })

        await this.$store.dispatch('taps/fetchTaps')
      } catch (error) {
        console.error(error)
      }
    },
    async updateReview() {
      try {
        await this.$axios.$patch(`/reviews/${this.userReview._id}`, this.userReview)

        this.userReview = {
          _id: null,
          comment: '',
          rating: 5
        }

        await this.$store.dispatch('taps/fetchTaps')
      } catch (error) {
        console.error(error)
      }

      this.editingReview = false
    },
    setRating(rating: number) {
      this.userReview.rating = rating
    },
    editReview(review: any) {
      this.editingReview = true
      this.userReview = { ...review };
      (this.$refs.reviewForm as HTMLElement)?.scrollIntoView({ behavior: 'smooth' })
    }
  }
})
</script>

<style lang="scss">
.map {
  height: 300px;

  .GMap__Wrapper {
    height: 100%;
  }
}

.review-rating {
  .star {
    cursor: pointer;

    &:hover {
      transform: scale3d(.5, .5, .5);
    }
  }
}
</style>
